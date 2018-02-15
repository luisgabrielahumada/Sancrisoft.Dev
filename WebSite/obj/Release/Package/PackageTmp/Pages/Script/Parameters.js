'use strict';

angular.module('App.Parameters', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'breaDcrumb', 'serviceRest', 'authService'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/Parameters", {
        controller: "ParametersCtrl",
        templateUrl: "Partial/Parameters.html"
    });
}])

.controller('ParametersCtrl', ['$scope', 'serviceRest', 'breaDcrumb', 'authService', '$location', function ($scope, serviceRest, breaDcrumb, authService, $location) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message,'error'); }
    $scope.items = [];
    //variable para controlar campos requeridos
    $scope.isValid = true;
    $scope.pagination = {
        pageIndex: 1,
        pageSize: 10
    }
    //listar la grilla
    $scope.List = function (pageIndex) {
        $scope.DropdownProfile();
        $scope.DropdownCities();
        $scope.pagination.pageIndex = pageIndex;
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Parameters/Get?pageIndex=' + $scope.pagination.pageIndex + '&pageSize=' + $scope.pagination.pageSize, function (response) {
            $scope.items = response.data.items;
            $scope.pagination.totalPage = response.data.totalPages;
            $scope.pagination.totalItemCount = response.data.totalItemCount;
        }, $scope.error).$promise;

    };

    //insertar o actualizar registro
    $scope.Save = function () {
        $.each($scope.items, function (index, item) {
            $scope.Rest.Post($scope.Settings.Uri, 'Parameters/Post', item,
                    function (response) {
                        $scope.ngNotify.set("Parametro '" + item.ds_parameter + "' actualizado",'success');
                    }, $scope.error);
        });
    };

    $scope.DropdownProfile = function (type) {
        $scope.Rest.Get($scope.Settings.Uri, 'Common/Get?type=PROFILES&id=' + 0,
                function (response) {
                    $scope.profilesItems = response.data;
                }, $scope.error);
    };
    $scope.DropdownCities = function (type) {
        $scope.Rest.Get($scope.Settings.Uri, 'Common/Get?type=CD_CITIES&id=' + 0,
                function (response) {
                    $scope.citiesItems = response.data;
                }, $scope.error);
    };

    $scope.List($scope.pagination.pageIndex);
}]);
