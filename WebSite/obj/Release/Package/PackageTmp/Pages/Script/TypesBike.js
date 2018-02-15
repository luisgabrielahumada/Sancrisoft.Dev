'use strict';

angular.module('App.TypesBike', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/TypesBike", {
        controller: "TypesBikesCrtl",
        templateUrl: "Partial/TypesBike.html"
    });
    $routeProvider.when("/TypesBike/:Id", {
        controller: "TypesBikeCtrl",
        templateUrl: "Partial/TypesBikedtl.html"
    });
}])
.controller('TypesBikesCrtl', ['$scope', 'serviceRest', 'breaDcrumb', function ($scope, serviceRest, breaDcrumb) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
   
    $scope.error = function (data) { $scope.ngNotify.set(data.Message,'error'); }
    $scope.items = [];

    $scope.pagination = {
        pageIndex: 1,
        pageSize: 10
    }
    $scope.List = function (pageIndex) {
        $scope.pagination.pageIndex = pageIndex;
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'TypeBike/Get?PageIndex=' + $scope.pagination.pageIndex + '&PageSize=' + $scope.pagination.pageSize, function (response) {
            $scope.items = response.data.items;
            $scope.pagination.totalPage = response.data.totalPages;
            $scope.pagination.totalItemCount = response.data.totalItemCount;
        }, $scope.error).$promise;
    };

    $scope.Delete = function (id, status) {
        $scope.Rest.Patch($scope.Settings.Uri, 'TypeBike/Patch/' + id + '?Status=' + status, function (response) {
            $scope.ngNotify.set("Registro procesado exitosamente.",'warn');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);

    };

    $scope.Remove = function (id) {
        $scope.Rest.Delete($scope.Settings.Uri, 'TypeBike/Remove/' + id, null, function (response) {
            $scope.ngNotify.set("Registro eliminado con extio.",'info');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);
    };

    $scope.List($scope.pagination.pageIndex);
}]);

App.controller('TypesBikeCtrl', ['$scope', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', 'authService', function ($scope, serviceRest, breaDcrumb, $routeParams, $location, authService) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    $scope.isValid = true;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set( data.Message,'error'); }

    //Detalle de la pagina
    $scope.Get = function () {
        if ($routeParams.Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'TypeBike/Get/' + $routeParams.Id, function (response) {
                $scope.item = response.data;
            }, $scope.error);
        }
    };


    //insertar o actualizar registro
    $scope.Save = function () {
        if ($scope.myForm.$error.required) {
            $scope.isValid = false;
            $scope.ngNotify.set("Los campos en rojos son requeridos",'error');
            return;
        }
        if ($routeParams.Id == 0) {
            $scope.Rest.Post($scope.Settings.Uri, 'TypeBike/Post', $scope.item,
                    function (response) {
                        $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
                        $location.path("/TypesBike");
                    }, $scope.error);
        }
        if ($routeParams.Id != 0) {
            $scope.Rest.Put($scope.Settings.Uri, 'TypeBike/Put/' + $routeParams.Id, $scope.item,
                    function (response) {
                        $scope.ngNotify.set(String.format("El Tipo {0} guardado exitosamente.", $scope.item.Name), 'success');
                        $location.path("/TypesBike");
                    }, $scope.error);
        }
    };
    $scope.Get();
}]);