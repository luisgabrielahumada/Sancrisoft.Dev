'use strict';

angular.module('App.ProfileUser', ['ngRoute', 'angular-loading-bar', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/ProfileUser", {
        controller: "ProfileUserCrtl",
        templateUrl: "Partial/ProfileUser.html"
    });
    $routeProvider.when("/Setting", {
        controller: "ProfileUserCrtl",
        templateUrl: "Partial/ProfileUser.html"
    });
    $routeProvider.when("/History", {
        controller: "ProfileUserCrtl",
        templateUrl: "Partial/ProfileUser.html"
    });
}])
App.controller('ProfileUserCrtl', ['$scope', 'serviceRest', 'breaDcrumb', 'authService', 'localStorageService', function ($scope, serviceRest, breaDcrumb, authService, localStorageService) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    //Manejador de errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    //validaciones
    $scope.isValid = true;
    $scope.selectedTab = 1;

    //Paginacion
    $scope.pagination = {
        pageIndex: 1,
        pageSize: 10
    }
    $scope.Get = function () {
        $scope.Rest.Get( $scope.Settings.Uri, 'Users/ProfilUser',
                function (response) {
                    $scope.item = response.data;
                }, $scope.error);
    };

    
    $scope.Profiles = function () {
        $scope.Rest.Get( $scope.Settings.Uri, 'Profiles/Get?pageIndex=1&pageSize=99999999',
                function (response) {
                    $scope.items = response.data.items;
                }, $scope.error);
    };


    $scope.Save = function () {
        if ($scope.myForm.$error.required) {
            $scope.isValid = false;
            $scope.ngNotify.set("Los campos en rojos son requeridos", 'error');
            return;
        }
        $scope.Rest.Post($scope.Settings.Uri, 'Users/Put/' + $scope.item.Id, $scope.item,
                function (response) {
                    $scope.ngNotify.set(String.format("Registro guardado exitosamente para el Usuario {0}",$scope.item.UserName),'success');
                }, $scope.error);
    };
    $scope.setTab = function (tab) {
        if (tab===3) {
            $scope.GetTimeline();
        }
        $scope.selectedTab = tab;
    };


    $scope.ChangePassword = function () {
        if ($scope.myPasswordForm.$error.required) {
            $scope.isValid = false;
            $scope.ngNotify.set("Los campos en rojos son requeridos",'error');
            return;
        }
        var data = {
            PasswordOld: $scope.PasswordOld,
            NewPassword: $scope.NewPassword,
            ConfirmPassword: $scope.ConfirmPassword,
            Comments: $scope.Comments,
            UserName: $scope.item.UserName
        }
        $scope.Rest.Post($scope.Settings.Uri, 'Auth/ChangePassword', data,
                function (response) {
                    $scope.ngNotify.set("Registro guardado exitosamente.",'success');
                }, $scope.error);
    };

    $scope.ClearCache = function () {
        $scope.ngNotify.set("Espere un momento puede tardar varios minutos",'warn');
        $scope.Rest.Get($scope.Settings.Uri, 'Profiles/ClearCache',
                 function (response) {
                     $scope.ngNotify.set("Procesos de limpiar cache realizado con exito",'success');
                 }, $scope.error);
    };

    $scope.ResetPassword = function () {
        $scope.Rest.Get( $scope.Settings.Uri, 'Auth/ResetPassword',
                function (response) {
                    $scope.ngNotify.set("Reset de clase realizado con éxito.",'success');
                }, $scope.error);
    };

    $scope.RefreshToken = function () {
        var data = {
            UserName: $scope.item.UserName 
        }
        $scope.Rest.Post( $scope.Settings.Uri, 'Auth/RefreshToken', data,
                function (response) {
                    $scope.item.Session = authService.authentication.Session;
                    localStorageService.remove('authorizationBussinesData');
                    localStorageService.set('authorizationBussinesData', { token: response.result.access_token, UserName: response.result.UserName, Session: response.result.Session, Profile: response.result.Profile, UpdatedId: response.result.UpdatedId });
                    $scope.ngNotify.set("Reset de token realizado con éxito.",'success');
                }, $scope.error);
    };
    
    $scope.Get();
    $scope.Profiles();
}]);