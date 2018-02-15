'use strict';

angular.module('App.MessagesLog', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/MessagesLog", {
        controller: "MessagesLogCtrl",
        templateUrl: "Partial/MessagesLog.html"
    });
    $routeProvider.when("/MessageLog/:Id", {
        controller: "MessageLogCtrl",
        templateUrl: "Partial/MessageLog.html"
    });

}])
.controller('MessagesLogCtrl', ['$scope', 'serviceRest', 'breaDcrumb', function ($scope, serviceRest, breaDcrumb, $log) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message,'error'); }
    $scope.items = [];
    $scope.pagination = {
        pageIndex: 1,
        pageSize: 10
    }
    //listar la grilla
    $scope.List = function (pageIndex) {
        $scope.pagination.pageIndex = pageIndex;
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Messages/Get?PageIndex=' + $scope.pagination.pageIndex + '&PageSize=' + $scope.pagination.pageSize, function (response) {
            $scope.items = response.data.items;
            $scope.pagination.totalPage = response.data.totalPages;
            $scope.pagination.totalItemCount = response.data.totalItemCount;
        }, $scope.error).$promise; 
    };
 
    $scope.Delete = function (id) {
        $scope.Rest.Delete($scope.Settings.Uri, 'Messages/Remove/' + id, null, function (response) {
            $scope.ngNotify.set("Registro eliminado con extio.",'info');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);

    };
    $scope.List($scope.pagination.pageIndex);
}]);

App.controller('MessageLogCtrl', ['$scope', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', 'authService', function ($scope, serviceRest, breaDcrumb, $routeParams, $location, authService) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    $scope.selectedTab = 1;
    $scope.setTab = function (tab) {
        $scope.selectedTab = tab;
    };
    //Detalle de la pagina
    $scope.Get = function () {
        if ($routeParams.Id != undefined) {
            $scope.Rest.Get($scope.Settings.Uri, 'Messages/Get/' + $routeParams.Id, function (response) {
                $scope.item = response.data;
                $scope.description = JSON.parse(response.data.Description);
            }, $scope.error);
        }
    };
   
    $scope.Get();
}]);