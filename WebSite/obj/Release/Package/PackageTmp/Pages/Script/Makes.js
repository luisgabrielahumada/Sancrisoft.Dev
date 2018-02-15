'use strict';

angular.module('App.Makes', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/Makes", {
        controller: "MakesCrtl",
        templateUrl: "Partial/Makes.html"
    });
    $routeProvider.when("/Make/:Id", {
        controller: "MakeCtrl",
        templateUrl: "Partial/Make.html"
    });
}])
.controller('MakesCrtl', ['$scope', 'serviceRest', 'breaDcrumb', function ($scope, serviceRest, breaDcrumb) {
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
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Makes/Get?pageIndex=' + $scope.pagination.pageIndex + '&pageSize=' + $scope.pagination.pageSize, function (response) {
            $scope.items = response.data.items;
            $scope.pagination.totalPage = response.data.totalPages;
            $scope.pagination.totalItemCount = response.data.totalItemCount;
        }, $scope.error).$promise;
    };

    $scope.goStatus = function (id, status) {
        $scope.Rest.Patch($scope.Settings.Uri, 'Makes/Patch/' + status + '/' + id, function (response) {
            $scope.ngNotify.set("Registro procesado exitosamente.",'warn');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);

    };

    $scope.Delete = function (id) {
        $scope.Rest.Delete($scope.Settings.Uri, 'Makes/Delete/' + id, null, function (response) {
            $scope.ngNotify.set("Registro eliminado con extio.",'info');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);
    };

    $scope.List($scope.pagination.pageIndex);
}]);

App.controller('MakeCtrl', ['$scope', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', 'authService', function ($scope, serviceRest, breaDcrumb, $routeParams, $location, authService) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    $scope.isValid = true;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message,'error'); }

    //Detalle de la pagina
    $scope.Get = function () {
        if ($routeParams.Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'Makes/Get/' + $routeParams.Id, function (response) {
                $scope.item = response.item;
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
        $scope.Rest.Post($scope.Settings.Uri, 'Makes/Post', $scope.item,
                function (response) {
                    $scope.ngNotify.set( "Registro guardado exitosamente.",'success');
                    $location.path("/Makes");
                }, $scope.error);
    };
    $scope.Get();
}]);