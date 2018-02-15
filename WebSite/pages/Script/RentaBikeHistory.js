'use strict';

angular.module('App.RentaBikeHistory', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/RentaBikeHistory", {
        controller: "RentaBikeHistorysCtrl",
        templateUrl: "Partial/RentaBikeHistory.html"
    });
    $routeProvider.when("/RentaBikeHistory/:Id", {
        controller: "RentaBikeHistoryCtrl",
        templateUrl: "Partial/RentaBikeHistorydtl.html"
    });
}])

.controller('RentaBikeHistorysCtrl', ['$scope', 'serviceRest', 'breaDcrumb', 'serviceLocalized', 'authService', function ($scope, serviceRest, breaDcrumb, serviceLocalized, authService) {
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
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'RentaBikeHistory/Get?PageIndex=' + $scope.pagination.pageIndex + '&PageSize=' + $scope.pagination.pageSize, function (response) {
            $scope.items = response.data.items;
            $scope.pagination.totalPage = response.data.totalPages;
            $scope.pagination.totalItemCount = response.data.totalItemCount;
        }, $scope.error).$promise;

    };
    
    $scope.List($scope.pagination.pageIndex);
}]);


App.controller('RentaBikeHistoryCtrl', ['$scope', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', 'authService', function ($scope, serviceRest, breaDcrumb, $routeParams, $location, authService) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    $scope.isValid = true;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }

    //Detalle de la pagina
    $scope.Get = function () {
        if ($routeParams.Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'RentaBikeHistory/Get/' + $routeParams.Id, function (response) {
                $scope.item = response.data;
            }, $scope.error);
        }
        $scope.Countries();
    };

    $scope.Get();
}]);