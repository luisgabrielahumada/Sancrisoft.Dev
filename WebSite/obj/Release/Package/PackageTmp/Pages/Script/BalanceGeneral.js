'use strict';

angular.module('App.BalanceGeneral', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/BalanceGeneral", {
        controller: "BalanceGeneralCtrl",
        templateUrl: "Partial/BalanceGeneral.html"
    });
}])

.controller('BalanceGeneralCtrl', ['$scope', 'serviceRest', 'breaDcrumb', 'serviceLocalized', 'authService', function ($scope, serviceRest, breaDcrumb, serviceLocalized, authService) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    //listar la grilla
    $scope.discreteBarChart = {
        chart: {
            type: 'discreteBarChart',
            height: 250,
            margin: {
                top: 20,
                right: 20,
                bottom: 50,
                left: 55
            },
            x: function (d) { return d.Name; },
            y: function (d) { return d.Value; },
            showValues: true,
            valueFormat: function (d) {
                return d3.format(',.4f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: 'Gastos'
            },
            yAxis: {
                axisLabel: 'Total',
                axisLabelDistance: -10
            }
        }
    };

    $scope.BalanceOfMonth = function () {
        $scope.data = [];
        $scope.Rest.Get($scope.Settings.Uri, 'Balance/BalanceOfMonth', function (response) {
            response.data.BalanceExpenses;
            angular.forEach(response.data.BalanceExpenses, function (item, key) {
                if (item.IsPayment)
                    $scope.data.push({ "Name": item.Name, "Value": item.Value });
            });
            $scope.discreteBarChartdata = [{
                key: "Pago de Gastos",
                values: $scope.data
            }];
        }, $scope.error);

    };

    $scope.balanceMonthPaymentBarChart = {
        chart: {
            type: 'discreteBarChart',
            height: 250,
            margin: {
                top: 20,
                right: 20,
                bottom: 50,
                left: 55
            },
            x: function (d) { return d.Month; },
            y: function (d) { return d.Value; },
            showValues: true,
            valueFormat: function (d) {
                return d3.format(',.4f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: 'Meses'
            },
            yAxis: {
                axisLabel: 'Total',
                axisLabelDistance: -10
            }
        }
    };


    $scope.BalanceMonthPayment = function () {
        $scope.dataMonth = [];
        $scope.Rest.Get($scope.Settings.Uri, 'Balance/BalanceMonthPayment', function (response) {
            var data = jQuery.parseJSON(response.data);
            angular.forEach(data, function (item, key) {
                // debugger;
                if (item.length > 0)
                    $scope.dataMonth.push({ "Month": item[0].Name, "Value": item[0].TotalMonth });
            });
            $scope.balanceMonthPaymentBarChartData = [{
                key: "Pagos por Mes",
                values: $scope.dataMonth
            }];
        }, $scope.error);

    };

    $scope.BalanceMonthPayment();
    $scope.BalanceOfMonth()
}]);
