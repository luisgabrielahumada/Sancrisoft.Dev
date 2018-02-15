'use strict';

angular.module('App.Cities', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/Cities", {
        controller: "CitiesCtrl",
        templateUrl: "Partial/Cities.html"
    });
    $routeProvider.when("/Cities/:Id", {
        controller: "CitieCtrl",
        templateUrl: "Partial/Citiesdtl.html"
    });
}])

.controller('CitiesCtrl', ['$scope', 'serviceRest', 'breaDcrumb', 'serviceLocalized', 'authService', function ($scope, serviceRest, breaDcrumb, serviceLocalized, authService) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.items = [];
    $scope.pagination = {
        pageIndex: 1,
        pageSize: 15
    }
    //listar la grilla
    $scope.List = function (pageIndex) {
        $scope.pagination.pageIndex = pageIndex;
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Cities/Get?PageIndex=' + $scope.pagination.pageIndex + '&PageSize=' + $scope.pagination.pageSize, function (response) {
            $scope.items = response.data.items;
            $scope.pagination.totalPage = response.data.totalPages;
            $scope.pagination.totalItemCount = response.data.totalItemCount;
            $scope.pagination.pageSize = response.data.pageSize;
        }, $scope.error).$promise;

    };

    $scope.Delete = function (id, status) {
        $scope.Rest.Patch($scope.Settings.Uri, 'Cities/Patch/' + id + '?status=' + status, function (response) {
            $scope.ngNotify.set("Registro procesado exitosamente.", 'warn');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);

    };

    $scope.Remove = function (id) {
        $scope.Rest.Delete($scope.Settings.Uri, 'Cities/Remove/' + id, null, function (response) {
            $scope.ngNotify.set("Registro eliminado con extio.", 'info');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);

    };

    $scope.List($scope.pagination.pageIndex);
}]);


App.controller('CitieCtrl', ['$scope', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', 'authService', function ($scope, serviceRest, breaDcrumb, $routeParams, $location, authService) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    $scope.isValid = true;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }

    //Detalle de la pagina
    $scope.Get = function () {
        if ($routeParams.Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'Cities/Get/' + $routeParams.Id, function (response) {
                $scope.item = response.data;
            }, $scope.error);
        }
        $scope.Countries();
    };


    //insertar o actualizar registro
    $scope.Save = function () {
        if ($scope.myForm.$error.required) {
            $scope.isValid = false;
            $scope.ngNotify.set("Los campos en rojos son requeridos", 'error');
            return;
        }
        if ($routeParams.Id == 0) {
            $scope.Rest.Post($scope.Settings.Uri, 'Cities/Post', $scope.item,
                    function (response) {
                        $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
                        $location.path("/Cities");
                    }, $scope.error);
        }
        if ($routeParams.Id != 0) {
            $scope.Rest.Put($scope.Settings.Uri, 'Cities/Put/' + $routeParams.Id, $scope.item,
                    function (response) {
                        $scope.ngNotify.set(String.format("La ciudad {0} guardado exitosamente.",$scope.item.Name), 'success');
                        $location.path("/Cities");
                    }, $scope.error);
        }
    };
    $scope.Countries = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'Countries/Get?PageIndex=1&PageSize=99999',
                function (response) {
                    $scope.countryitems = response.data.items;
                }, $scope.error);
    };
    $scope.Get();
}]);