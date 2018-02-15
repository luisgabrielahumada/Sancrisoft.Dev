'use strict';

angular.module('App.Customers', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/Customers", {
        controller: "CustomersCtrl",
        templateUrl: "Partial/Customers.html"
    });
    $routeProvider.when("/Customers/:Id", {
        controller: "CustomerCtrl2",
        templateUrl: "Partial/Customersdtl.html"
    });
}])

.controller('CustomersCtrl', ['$scope', 'serviceRest', 'breaDcrumb', 'serviceLocalized', 'authService', function ($scope, serviceRest, breaDcrumb, serviceLocalized, authService) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.items = [];
    $scope.pagination = {
        pageIndex: 1,
        pageSize: 10
    }
    //listar la grilla
    $scope.List = function (pageIndex) {
        $scope.pagination.pageIndex = pageIndex;
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Customers/Get?PageIndex=' + $scope.pagination.pageIndex + '&PageSize=' + $scope.pagination.pageSize, function (response) {
            $scope.items = response.data.items;
            $scope.pagination.totalPage = response.data.totalPages;
            $scope.pagination.totalItemCount = response.data.totalItemCount;
        }, $scope.error).$promise;

    };

    $scope.Delete = function (id, status) {
        $scope.Rest.Patch($scope.Settings.Uri, 'Customers/Patch/' + id + '?status=' + status, function (response) {
            $scope.ngNotify.set("Registro procesado exitosamente.", 'warn');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);

    };

    $scope.Remove = function (id) {
        $scope.Rest.Delete($scope.Settings.Uri, 'Customers/Remove/' + id, null, function (response) {
            $scope.ngNotify.set("Registro eliminado con extio.", 'info');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);

    };

    $scope.List($scope.pagination.pageIndex);
}])

.controller('CustomerCtrl2', ['$scope', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', function ($scope, serviceRest, breaDcrumb, $routeParams, $location) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    $scope.isValid = true;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }

    //Detalle de la pagina
    $scope.Get = function () {
        if ($routeParams.Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'Customers/Get/' + $routeParams.Id, function (response) {
                $scope.item = response.data;
            }, $scope.error);
        }
        $scope.TypeDocuments();
    };


    //insertar o actualizar registro
    $scope.Save = function () {
        if ($scope.myForm.$error.required) {
            $scope.isValid = false;
            $scope.ngNotify.set("Los campos en rojos son requeridos", 'error');
            return;
        }
        if ($routeParams.Id == 0) {
            $scope.Rest.Post($scope.Settings.Uri, 'Customers/Post', $scope.item,
                    function (response) {
                        $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
                        $location.path("/Customers");
                    }, $scope.error);
        }
        if ($routeParams.Id != 0) {
            $scope.Rest.Put($scope.Settings.Uri, 'Customers/Put/' + $routeParams.Id, $scope.item,
                    function (response) {
                        $scope.ngNotify.set(String.format("La ciudad {0} guardado exitosamente.", $scope.item.Name), 'success');
                        $location.path("/Customers");
                    }, $scope.error);
        }
    };
    $scope.TypeDocuments = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'Common/GetTypeDocuments',
                function (response) {
                    $scope.items = response.data;
                }, $scope.error);
    };
    $scope.Get();
}]);
