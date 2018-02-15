'use strict';

angular.module('App.Inscription', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/Inscriptions", {
        controller: "InscriptionsCtrl",
        templateUrl: "Partial/Inscriptions.html"
    });

    $routeProvider.when("/Inscription/:Id", {
        controller: "InscriptionCtrl",
        templateUrl: "Partial/Inscriptiondtl.html"
    });
}])
App.controller('InscriptionsCtrl', ['$scope', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', function ($scope, serviceRest, breaDcrumb, $routeParams, $location) {
    breaDcrumb.breadcrumb();
    $scope.isSwhoe = true;
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
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Inscriptions/Get?PageIndex=' + $scope.pagination.pageIndex + '&PageSize=' + $scope.pagination.pageSize, function (response) {
            $scope.items = response.data.items;
            $scope.pagination.totalPage = response.data.totalPages;
            $scope.pagination.totalItemCount = response.data.totalItemCount;
        }, $scope.error).$promise;
    };

    $scope.List($scope.pagination.pageIndex);
}]);


App.controller('InscriptionCtrl', ['$scope', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', 'authService', 'ModalService', function ($scope, serviceRest, breaDcrumb, $routeParams, $location, authService, ModalService) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    $scope.isValid = true;
    $scope.isSwhoe = false;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.item = {
        Id: $routeParams.Id
    };
    //Detalle de la pagina
    $scope.Get = function () {
        if ($routeParams.Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'Inscriptions/Get/' + $routeParams.Id, function (response) {
                $scope.item = response.data;
            }, $scope.error);
        }
    };
    $scope.GetImg = function () {
        if ($routeParams.Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'Upload/GetImg/' + $routeParams.Id, function (response) {
                $scope.img = response.data;
            }, $scope.error);
        }
    };

    $scope.GetCharges = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'Charges/Get?pageIndex=1&pageSize=100',
                function (response) {
                    $scope.items = response.data.items;
                }, $scope.error);
    };
    $scope.GetCharges();
    $scope.Get();
    $scope.GetImg();
}])