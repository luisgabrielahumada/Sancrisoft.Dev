'use strict';
angular.module('Auth.Signup', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'serviceRest'])
Auth.config(function ($routeProvider) {

    $routeProvider.when("/Signup", {
        controller: "SignupCtrl",
        templateUrl: "Partial/Signup.html"
    });

}).controller('SignupCtrl', ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {


    $scope.error = function (data) { $scope.ngNotify.set( data.Message, 'error'); }
    $scope.isValid = true;

    $scope.SignUp = function () {
        if ($scope.myForm.$error.required) {
            $scope.isValid = false;
            $scope.ngNotify.set("Los campos en rojos son requeridos", 'error');
            return;
        }

        $scope.Rest.Post($scope.Settings.Uri, 'Auth/RegisterUser', $scope.UserRegister,
          function (response) {
              // TODO:falta validar si no viene algun error para que lo procese.
              $scope.ngNotify.set("Su cuenta se ha creado con éxito.",'success');
              $location.path('/login');
          }, $scope.error);
    };

    $scope.Cancel = function () {
        $location.path('/login');
    };

    var startTimer = function () {
        var timer = $timeout(function () {
            $timeout.cancel(timer);
            $location.path('/login');
        }, 2000);
    }

}]);