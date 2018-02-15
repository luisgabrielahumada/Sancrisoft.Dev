'use strict';
angular.module('Auth.RecoveryPassword', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'serviceRest'])
Auth.config(function ($routeProvider) {

    $routeProvider.when("/RecoveryPassword", {
        controller: "RecoveryPasswordCtrl",
        templateUrl: "Partial/RecoveryPassword.html"
    });

}).controller('RecoveryPasswordCtrl', ['$scope', '$location', '$timeout', 'authService', function ($scope, $location, $timeout, authService) {


    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.isValid = true;

    $scope.RecoveryPassword = function () {
        if ($scope.myForm.$error.required) {
            $scope.isValid = false;
            $scope.ngNotify.set("Los campos en rojos son requeridos", 'error');
            return;
        }
        $scope.Rest.Post($scope.Settings.Uri, 'Auth/RecoveryPassword', $scope.item,
          function (response) {
              // TODO:falta validar si no viene algun error para que lo procese.
              $scope.ngNotify.set("Su correo sera validado, revise su bandeja de correo siga las instrucciones.", 'success');
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