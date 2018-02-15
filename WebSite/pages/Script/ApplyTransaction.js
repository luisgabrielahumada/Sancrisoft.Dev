'use strict';

angular.module('App.ApplyTransaction', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest', 'angularModalService'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/ApplyTransaction", {
        controller: "ApplyTransactionCtrl",
        templateUrl: "Partial/ApplyTransaction.html"
    });
}])

.controller('ApplyTransactionCtrl', ['$scope', 'serviceRest', 'breaDcrumb', 'serviceLocalized', 'authService', 'ModalService', function ($scope, serviceRest, breaDcrumb, serviceLocalized, authService, ModalService) {
    breaDcrumb.breadcrumb();
    var currentTime = new Date();
    // returns the month (from 0 to 11)
    var month = currentTime.getMonth() + 1
    // returns the year (four digits)
    var year = currentTime.getFullYear();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.items = [];


    $scope.hoverIn = function () {
        this.hoverEdit = true;
    };

    $scope.hoverOut = function () {
        this.hoverEdit = false;
    };

    //listar la grilla
    $scope.Years = function () {
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Balance/GetYear', function (response) {
            $scope.years = response.data;
        }, $scope.error).$promise;
    };

    $scope.GetMonths = function () {
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Common/GetMonths',
                function (response) {
                    $scope.months = response.data;
                }, $scope.error).$promise;
    };

    $scope.GetTypePayment = function () {
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Common/GetTypePayment',
                function (response) {
                    $scope.itemsType = response.data;
                }, $scope.error).$promise;
    };

    $scope.List = function () {
        $scope.Year = $scope.Year == undefined ? year : $scope.Year;
        $scope.Month = $scope.Month == undefined ? month : $scope.Month;
        $scope.Rest.Get($scope.Settings.Uri, 'Balance/Get?month=' + $scope.Month + '&year=' + $scope.Year, function (response) {
            $scope.items = response.data;
        }, $scope.error);
    };

    $scope.Apply = function (item) {
        var BalanceSheet = {
            "Month": $scope.Month,
            "Year": $scope.Year,
            "BalanceExpenses":
                [{
                    "Name": item.Name,
                    "TypePayment": item.TypePayment,
                    "Description": item.Description,
                    "Value": item.Value,
                    "Month": $scope.Month,
                    "Year": $scope.Year,
                    "IsPayment": true,
                    "Expenses": {
                        "Id": item.Expenses.Id
                    }
                }]
        };

        $scope.Rest.Post($scope.Settings.Uri, 'Balance/Apply', BalanceSheet,
                function (response) {
                    $scope.notifygrowl.success("Registro guardado exitosamente.", { title: 'Success!' });
                    $scope.List();
                }, $scope.error);
    };

    $scope.Rejected = function (item) {
        var BalanceSheet = {
            "Month": $scope.Month,
            "Year": $scope.Year,
            "BalanceExpenses":
                [{
                    "Month": $scope.Month,
                    "Year": $scope.Year,
                    "IsPayment": false,
                    "Expenses": {
                        "Id": item.Expenses.Id
                    }
                }]
        };
        $scope.Rest.Post($scope.Settings.Uri, 'Balance/Rejected', BalanceSheet,
                function (response) {
                    $scope.notifygrowl.success("Registro guardado exitosamente.", { title: 'Success!' });
                    $scope.List();
                }, $scope.error);
    };

    $scope.Delete = function (item) {
        var BalanceSheet = {
            "Month": $scope.Month,
            "Year": $scope.Year,
            "BalanceExpenses":
                [{
                    "Month": $scope.Month,
                    "Year": $scope.Year,
                    "IsPayment": false,
                    "Expenses": {
                        "Id": item.Expenses.Id
                    }
                }]
        };
        $scope.Rest.Post($scope.Settings.Uri, 'Balance/Delete/', BalanceSheet,
                function (response) {
                    $scope.notifygrowl.info("Registro Eliminado exitosamente.", { title: 'Info!' });
                    $scope.List();
                }, $scope.error);
    };


    $scope.Lock = function () {
        var BalanceSheet = {
            "Month": $scope.Month,
            "Year": $scope.Year,
            "Id": $scope.items.Id
        };
        $scope.Rest.Post($scope.Settings.Uri, 'Balance/Lock', BalanceSheet,
                function (response) {
                    $scope.notifygrowl.success("Registro guardado exitosamente.", { title: 'Success!' });
                    $scope.List();
                }, $scope.error);
    };
    $scope.UnLock = function () {
        var BalanceSheet = {
            "Month": $scope.Month,
            "Year": $scope.Year,
            "Id": $scope.items.Id
        };
        $scope.Rest.Post($scope.Settings.Uri, 'Balance/UnLock', BalanceSheet,
                function (response) {
                    $scope.notifygrowl.success("Registro guardado exitosamente.", { title: 'Success!' });
                    $scope.List();
                }, $scope.error);
    };

    $scope.Years();
    $scope.GetMonths();
    $scope.GetTypePayment();
    $scope.List();
}])
