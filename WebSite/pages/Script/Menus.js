'use strict';

angular.module('App.Menus', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/Menus", {
        controller: "MenusCtrl",
        templateUrl: "Partial/Menus.html"
    });

    $routeProvider.when("/Menus/:Id", {
        controller: "MenuCtrl",
        templateUrl: "Partial/Menudtl.html"
    });

}])
.controller('MenusCtrl', ['$scope', 'serviceRest', 'breaDcrumb', function ($scope, serviceRest, breaDcrumb) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.items = [];
    //Datos para paginacion
    $scope.pagination = {
        pageIndex: 1,
        totalPage: 1,
        pageSize:15
    }
    //listar la grilla
    $scope.List = function (pageIndex) {
        $scope.pagination.pageIndex = pageIndex;
        $scope.Rest.Get($scope.Settings.Uri, 'Menus/Get?pageIndex=' + $scope.pagination.pageIndex + '&pageSize=' + $scope.pagination.pageSize, function (response) {
            $scope.items = response.data.items;
            $scope.pagination.totalPage = response.data.totalPages;
            $scope.pagination.totalItemCount = response.data.totalItemCount;
            $scope.pagination.pageSize = response.data.pageSize;
        }, $scope.error);
    };

    $scope.Delete = function (id, status) {
        $scope.Rest.Patch($scope.Settings.Uri, 'Menus/Patch/' + id + '?status=' + status, function (response) {
            $scope.ngNotify.set("Registro procesado exitosamente.", 'warn');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);
    };

    $scope.Remove = function (id) {
        $scope.Rest.Delete($scope.Settings.Uri, 'Menus/Remove/' + id, null, function (response) {
            $scope.ngNotify.set("Registro eliminado con extio.", 'info');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);
    };

    $scope.List($scope.pagination.pageIndex);
}]);


App.controller('MenuCtrl', ['$scope', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', function ($scope, serviceRest, breaDcrumb, $routeParams, $location) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    $scope.isValid = true;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }

    //Detalle de la pagina
    $scope.Get = function () {
        if ($routeParams.Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'Menus/Get/' + $routeParams.Id, function (response) {
                $scope.item = response.data;
            }, $scope.error);
        }
    };

    //insertar o actualizar registro
    $scope.Save = function (Id) {
        if ($scope.myForm.$error.required) {
            $scope.isValid = false;
            $scope.ngNotify.set("Los campos en rojos son requeridos", 'error');
            return;
        }
        if (Id == undefined) {
            $scope.Rest.Post($scope.Settings.Uri, 'Menus/Post', $scope.item,
                    function (response) {
                        $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
                        $location.path("/Menus");
                    }, $scope.error);
        }
        if (Id != undefined) {
            $scope.Rest.Post($scope.Settings.Uri, 'Menus/Put/' + Id, $scope.item,
                   function (response) {
                       $scope.ngNotify.set(String.format("Menu {0} actualizado exitosamente.", $scope.item.Name), 'success');
                       $location.path("/Menus");
                   }, $scope.error);
        }
    };

    $scope.MenusParent = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'Menus/Get?pageIndex=1&pageSize=100',
                function (response) {
                    $scope.itemsParent = response.data.items;
                }, $scope.error);
    };
    $scope.MenusParent();
    $scope.Get();
}]);