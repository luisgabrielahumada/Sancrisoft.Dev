'use strict';

angular.module('App.Unauthorized', ['ngRoute', 'angular-loading-bar', 'authService', 'breaDcrumb', 'serviceRest'])
 .config(['$routeProvider', function ($routeProvider) {

     $routeProvider.when("/Unauthorized", {
         controller: "UnauthorizedCtrl",
         templateUrl: "Partial/Unauthorized.html"
     });

 }])
.controller('UnauthorizedCtrl', ['$scope', 'authService', 'localStorageService', function ($scope, authService, localStorageService) {
    //manejo de validaciones
    $scope.isValid = true;
    //manejo de errores.
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.RefreshToken = function () {
        if ($scope.myForm.$error.required) {
            $scope.isValid = false;
            $scope.ngNotify.set("Los campos en rojos son requeridos", 'error');
            return;
        }
        var data = {
            UserName: $scope.ds_login
        }
        $scope.Rest.Post($scope.Settings.Uri, 'Auth/RefreshToken', data,
                function (response) {
                    localStorageService.remove('authorizationBussinesData');
                    localStorageService.set('authorizationBussinesData', { token: response.result.access_token, UserName: response.result.UserName, SessionId: response.result.SessionId, Profile: response.result.profile, userLogonID: response.result.UserLogonID });
                    $scope.ngNotify.set("Reset de token realizado con éxito.",'success');
                }, $scope.error);
    };
}]);