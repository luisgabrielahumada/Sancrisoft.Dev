'use strict';

angular.module('App.Permissions', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/Permissions", {
        controller: "PermissionsCtrl",
        templateUrl: "Partial/Permissions.html"
    });
    $routeProvider.when("/Permissions/:Id", {
        controller: "PermissionsCtrl",
        templateUrl: "Partial/Permissions.html"
    });

    $routeProvider.when("/Permissions/:Id/:key", {
        controller: "PermissionsCtrl",
        templateUrl: "Partial/Permissions.html"
    });

}])
.controller('PermissionsCtrl', ['$scope', 'serviceRest', 'breaDcrumb', 'authService', '$routeParams', function ($scope, serviceRest, breaDcrumb, authService, $routeParams) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    $scope.viewprofile = false;
    $scope.viewusers = false;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.parents = [];
    //listar la grilla
    $scope.List = function () {
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Menus/MenuOptionSession',
            function (response) {
                $scope.parents = response.data;
            }, $scope.error).$promise;
    };
    //Detalle de la pagina
    $scope.Get = function () {
        $scope.GetProfileAssign();
        if ($routeParams.Id != undefined) {
            $scope.viewprofile = true;
            $scope.viewusers = false;
            $scope.Rest.Get($scope.Settings.Uri, 'Menus/Get/' + $routeParams.Id,
                function (response) {
                    $scope.item = response.data;
                }, $scope.error);
            $scope.Rest.Get($scope.Settings.Uri, 'Menus/GetPermissionMenuID/' + $routeParams.Id,
                function (response) {
                    $scope.items = response.data;
                }, $scope.error);
        }
    };
    //Listado de Usuarios Por Perfil
    //$scope.GetUsers = function () {
    //    $scope.GetUsersAssign();
    //    $scope.key = $routeParams.key;
    //    if ($routeParams.Id2 != undefined) {
    //        $scope.viewprofile = false;
    //        $scope.viewusers = true;
    //        $scope.Rest.Get($scope.Settings.Uri, 'Permissions/CheckUsersPermissions/' + $routeParams.key + '/' + $routeParams.Id + '/' + $routeParams.Id2,
    //            function (response) {
    //                $scope.Usersitems = response.data;
    //                $scope.item = response.item;
    //            }, $scope.error);
    //    }
    //};
    //Guardar los permisos del perfil
    $scope.Save = function () {
        $.each($scope.items, function (index, item) {
            $scope.Rest.Post($scope.Settings.Uri, 'Menus/UpdateProfileMenu/' + $routeParams.Id, item,
                function () {
                    $scope.ngNotify.set(String.format("Permisos asignados con exito a la pàgina {0}",item.Menu.Name), 'success');
                    $scope.Get();
                }, $scope.error
            );
        });
    };
    //Guardar los permisos del Usuario
    //$scope.SaveUsers = function () {
    //    $.each($scope.Usersitems, function (index, item) {
    //        $scope.Rest.Post($scope.Settings.Uri, 'Permissions/CheckPermissionsApplyUsers', item,
    //            function () {
    //                $scope.ngNotify.set("Permisos asignados con exito.",'success');
    //                $scope.GetUsers();
    //            }, $scope.error
    //        );
    //    });
    //};
    //Cargar los perfiles que se pueden asignar
    $scope.GetProfileAssign = function () {
        if ($routeParams.Id != undefined) {
            $scope.Rest.Get($scope.Settings.Uri, 'Profiles/Get?PageIndex=1&PageSize=100',
                    function (response) {
                        $scope.assignsProfile = response.data.items;
                    }, $scope.error);
        }
    };
    ////Cargar los usuarios que se pueden asignar
    //$scope.GetUsersAssign = function () {
    //    if ($routeParams.Id2 != undefined) {
    //        $scope.Rest.Get($scope.Settings.Uri, 'Common/Get?type=USERS_ACCESS&parameter=' + $routeParams.Id2 + '&id=' + $routeParams.Id,
    //                function (response) {
    //                    $scope.assignsUsers = response.data;
    //                }, $scope.error);
    //    }
    //};
    ////Asignacion de perfil
    $scope.AssingnProfile = function () {
        if ($routeParams.Id != undefined) {
            var data = {
                IsView: true,
                IsNew: false,
                IsEdit: false,
                IsStatus: false,
                IsModify: false,
                IsSpecial: false,
                IsDelete: false,
                Status: true
            }
            $scope.Rest.Post($scope.Settings.Uri, 'Menus/AddProfileMenu/' + $routeParams.Id + '/' + Profile.value, data,
                function (response) {
                    $scope.ngNotify.set("Perfil asignado con exito.", 'success');
                    $scope.Get();
                }, $scope.error);
        }
    };
    ////Asignacion de usuario
    //$scope.AssingnUsers = function () {
    //    $scope.Id = $routeParams.Id;
    //    if ($routeParams.Id2 != undefined) {
    //        $scope.Rest.Get($scope.Settings.Uri, 'Permissions/CheckPermissionsApplyUser/' + $routeParams.key + '/' + $routeParams.Id + '/' + $routeParams.Id2 + '/?userId=' + $scope.id_user,
    //            function (response) {
    //                $scope.ngNotify.set("Usuario asignado con exito.",'success');
    //                $scope.GetUsers();
    //            }, $scope.error);
    //    }
    //};
    ////Listado de Usuarios Por Perfil
    //$scope.RemoveUser = function (id) {
    //    $scope.Rest.Get($scope.Settings.Uri, 'Permissions/RemoveUsersPermissions/' + id,
    //        function (response) {
    //            $scope.ngNotify.set("Usuario eliminado con exito",'warn');
    //            $scope.GetUsers();
    //        }, $scope.error);
    //};
    $scope.RemoveProfile = function (id) {
        $scope.Rest.Get($scope.Settings.Uri, 'Menus/RemoveProfileMenu/' + id,
            function (response) {
                $scope.ngNotify.set("Perfil eliminado con exito",'warn');
                $scope.Get();
            }, $scope.error);
    };
    //ejecuacion de los metodos.
    $scope.Get();
    // $scope.GetUsers();
    $scope.List();
}]);
