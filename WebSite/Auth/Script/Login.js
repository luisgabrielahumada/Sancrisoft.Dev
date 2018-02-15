'use strict';
angular.module('Auth.Login', ['ngRoute', 'angular-loading-bar','ngAnimate', 'authService', 'serviceRest'])
Auth.config(function ($routeProvider) {

    $routeProvider.when("/Login", {
        controller: "LoginCtrl",
        templateUrl: "Partial/Login.html"
    });

    $routeProvider.otherwise({ redirectTo: "/Inscription" });

})
.controller('LoginCtrl', ['$scope', 'serviceRest', 'localStorageService', 'authService', function ($scope, serviceRest, localStorageService, authService) {
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.isValid = true;
    $scope.login = function () {
        if ($scope.myForm.$error.required) {
            $scope.isValid = false;
            $scope.ngNotify.set("Los campos en rojos son requeridos", 'error');
            return;
        }
        var _data = {
            "userName": $scope.loginData.userName,
            "Password": $scope.loginData.password
        }
        $scope.Rest.Post($scope.Settings.Uri, 'Auth/Login', _data,
            function (response) {
                // TODO:falta validar si no viene algun error para que lo procese.
                localStorageService.set('authorizationBussinesData', { token: response.data.access_token, UserName: response.data.UserName, Session: response.data.Session, Profile: response.data.Profile, UpdatedId: response.data.UpdatedId });
                document.location.href = "../Pages/index.html";
            }, $scope.error);

    };

}]);
