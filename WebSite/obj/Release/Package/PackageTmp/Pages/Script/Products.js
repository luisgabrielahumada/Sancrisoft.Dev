'use strict';

angular.module('App.Products', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest', 'angularModalService'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/Products", {
        controller: "ProductsCtrl",
        templateUrl: "Partial/Products.html"
    });
    $routeProvider.when("/Products/:Id", {
        controller: "ProductCtrl",
        templateUrl: "Partial/Productsdtl.html"
    });
}])

.controller('ProductsCtrl', ['$scope', 'serviceRest', 'breaDcrumb', 'serviceLocalized', 'authService', 'ModalService', function ($scope, serviceRest, breaDcrumb, serviceLocalized, authService, ModalService) {
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
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Products/Get?PageIndex=' + $scope.pagination.pageIndex + '&PageSize=' + $scope.pagination.pageSize, function (response) {
            $scope.items = response.data.items;
            $scope.pagination.totalPage = response.data.totalPages;
            $scope.pagination.totalItemCount = response.data.totalItemCount;
        }, $scope.error).$promise;
    };

    $scope.Delete = function (id, status) {
        $scope.Rest.Patch($scope.Settings.Uri, 'Products/Patch/' + id + '?status=' + status, function (response) {
            $scope.ngNotify.set("Registro procesado exitosamente.", 'warn');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);

    };

    $scope.Remove = function (id) {
        $scope.Rest.Delete($scope.Settings.Uri, 'Products/Remove/' + id, null, function (response) {
            $scope.ngNotify.set("Registro eliminado con extio.", 'info');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);
    };

    $scope.List($scope.pagination.pageIndex);
}]);

App.controller('ProductCtrl', ['$scope', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', 'authService', 'ModalService', function ($scope, serviceRest, breaDcrumb, $routeParams, $location, authService, ModalService) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    $scope.isValid = true;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.item = {
        Id: $routeParams.Id
    };
    //Detalle de la pagina
    $scope.Get = function () {
        if ($routeParams.Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'Products/Get/' + $routeParams.Id, function (response) {
                $scope.item = response.data;
            }, $scope.error);
        }
        $scope.Providers();
        $scope.GetServiceType();
    };
    //New/Edit/Modify Taxes
    $scope.NewOrEdit = function (Id) {
        if (Id == undefined)
            Id = $scope.item.Id;
        ModalService.showModal({
            templateUrl: "Partial/Modal/Taxesdtl.html",
            controller: "Taxes",
            inputs: {
                Id: Id
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.Get();
            });
        });
    };

    //insertar o actualizar registro
    $scope.Save = function () {
        if ($scope.myForm.$error.required) {
            $scope.isValid = false;
            $scope.ngNotify.set("Los campos en rojos son requeridos", 'error');
            return;
        }
        if ($routeParams.Id == 0) {
            $scope.Rest.Post($scope.Settings.Uri, 'Products/Post', $scope.item,
                    function (response) {
                        $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
                        $scope.item.id = response.id;
                        $location.path("/Products/" + response.id);
                    }, $scope.error);
        }
        if ($routeParams.Id != 0) {
            $scope.Rest.Put($scope.Settings.Uri, 'Products/Put/' + $routeParams.Id, $scope.item,
                    function (response) {
                        $scope.ngNotify.set(String.format("La ciudad {0} guardado exitosamente.", $scope.item.Name), 'success');
                        $location.path("/Products");
                    }, $scope.error);
        }
    };
    $scope.Providers = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'Providers/Get?PageIndex=1&PageSize=99999',
                function (response) {
                    $scope.items = response.data.items;
                }, $scope.error);
    };

    $scope.GetServiceType = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'Common/GetServiceType',
                function (response) {
                    $scope.serviceTypes = response.data;
                }, $scope.error);
    };
    $scope.Get();
}])

.controller('Taxes', ['$scope', 'close', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', 'Id', function ($scope, close, serviceRest, breaDcrumb, $routeParams, $location, Id) {
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }

    $scope.Taxes = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'Taxes/Get?PageIndex=1&PageSize=99999', function (response) {
            $scope.items = response.data.items;
        }, $scope.error);
    };

    $scope.Save = function () {
        $scope.item = {
            Id: $scope.Taxe,
            Product: {
                Id: Id
            }
        }
        $scope.Rest.Post($scope.Settings.Uri, 'Products/AddTaxes', $scope.item, function (response) {
            $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
            $scope.List();
        }, $scope.error);
    };

    $scope.Remove = function (id) {
        $scope.Rest.Delete($scope.Settings.Uri, 'Products/RemoveTaxe/' + id,null, function (response) {
            $scope.ngNotify.set("Registro eliminado exitosamente.", 'success');
            $scope.showModal = true;
            $scope.List();
        }, $scope.error);
    };

    $scope.Close = function (result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };

    $scope.List = function () {
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Products/GetProductByTaxes/' + Id, function (response) {
            $scope.itemsTaxes = response.data;
        }, $scope.error).$promise;
    };
    $scope.Taxes();
    $scope.List();
}]);