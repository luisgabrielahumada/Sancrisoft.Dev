'use strict';

angular.module('App.Inventory', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/Inventory", {
        controller: "InventorysCtrl",
        templateUrl: "Partial/Inventory.html"
    });

    $routeProvider.when("/Inventory/:Id", {
        controller: "InventoryCtrl",
        templateUrl: "Partial/Inventorydtl.html"
    });

}])
.controller('InventorysCtrl', ['$scope', 'serviceRest', 'breaDcrumb', function ($scope, serviceRest, breaDcrumb) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.items = [];
    //Datos para paginacion
    $scope.pagination = {
        pageIndex: 1,
        pageSize: 10
    }
    //listar la grilla
    $scope.List = function (pageIndex) {
        $scope.pagination.pageIndex = pageIndex;
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Inventory/Get?PageIndex=' + $scope.pagination.pageIndex + '&PageSize=' + $scope.pagination.pageSize, function (response) {
            $scope.items = response.data.items;
            $scope.pagination.totalPage = response.data.totalPages;
            $scope.pagination.totalItemCount = response.data.totalItemCount;
        }, $scope.error).$promise;
    };


    $scope.Delete = function (id, status) {
        $scope.Rest.Patch($scope.Settings.Uri, 'Inventory/Patch/' + id + '?status=' + status, function (response) {
            $scope.ngNotify.set("Registro procesado exitosamente.", 'warn');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);
    };

    $scope.Remove = function (id) {
        $scope.Rest.Delete($scope.Settings.Uri, 'Inventory/Remove/' + id, null, function (response) {
            $scope.ngNotify.set("Registro eliminado con extio.", 'info');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);
    };

    $scope.List($scope.pagination.pageIndex);
}]);


App.controller('InventoryCtrl', ['$scope', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', function ($scope, serviceRest, breaDcrumb, $routeParams, $location) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    $scope.isValid = true;
    $scope.Id = $routeParams.Id;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.item = {
        Id: $routeParams.Id
    };
    //Detalle de la pagina
    $scope.Get = function () {
        if ($scope.Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'Inventory/Get/' + $scope.Id, function (response) {
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
        if (Id == undefined || Id==0) {
            $scope.Rest.Post($scope.Settings.Uri, 'Inventory/Post', $scope.item,
                    function (response) {
                        $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
                        $location.path("/Inventory");
                    }, $scope.error);
        }
        if (Id != undefined) {
            $scope.Rest.Post($scope.Settings.Uri, 'Inventory/Put/' + Id, $scope.item,
                   function (response) {
                       $scope.ngNotify.set(String.format("Inventario {0} actualizado exitosamente.", $scope.item.Name), 'success');
                       $location.path("/Inventory");
                   }, $scope.error);
        }
    };

    $scope.Products = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'Products/Get?pageIndex=1&pageSize=9999',
                function (response) {
                    $scope.items = response.data.items;
                }, $scope.error);
    };
    $scope.Products();
    $scope.Get();
}]);