'use strict';

angular.module('App.Home', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/Home", {
        controller: "HomeCtrl",
        templateUrl: "Partial/Home.html"
    });

}])

.controller('HomeCtrl', ['$scope', 'serviceRest', '$route', 'authService', '$timeout', function ($scope, serviceRest, $route, authService, $timeout) {

    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }

    $scope.balanceMonthPaymentBarChart = {
        chart: {
            type: 'discreteBarChart',
            height: 200,
            margin: {
                top: 10,
                right: 10,
                bottom: 30,
                left: 35
            },
            x: function (d) { return d.Month; },
            y: function (d) { return d.Value; },
            showValues: true,
            valueFormat: function (d) {
                return d3.format(',.4f')(d);
            },
            duration: 500,
            xAxis: {
                axisLabel: ''
            },
            yAxis: {
                axisLabel: '',
                axisLabelDistance: -20
            }
        }
    };

    $scope.discreteBarChart = {
        chart: {
            type: 'discreteBarChart',
            height: 200,
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
                axisLabel: ''
            },
            yAxis: {
                axisLabel: '',
                axisLabelDistance: -10
            }
        }
    };

    $scope.gridsterOptions = {
        margins: [20, 20],
        columns: 4,
        mobileModeEnabled: false,
        draggable: {
            handle: 'h3'
        },
        resizable: {
            enabled: true,
            handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],

            // optional callback fired when resize is started
            start: function (event, $element, widget) { },

            // optional callback fired when item is resized,
            resize: function (event, $element, widget) {
                if (widget.chart.api) widget.chart.api.update();
            },

            // optional callback fired when item is finished resizing 
            stop: function (event, $element, widget) {
                $timeout(function () {
                    if (widget.chart.api) widget.chart.api.update();
                }, 400)
            }
        },
    };

    $scope.ViewDashBoard = function () {
        $scope.dataMonth = [];
        $scope.data = [];
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
            $scope.dashboard = {
                widgets: [{
                    col: 0,
                    row: 0,
                    sizeY: 2,
                    sizeX: 2,
                    name: "Balance del Mes",
                    chart: {
                        options: $scope.discreteBarChart,
                        data: $scope.discreteBarChartdata,
                        api: {}
                    }
                }, {
                    col: 1,
                    row: 1,
                    sizeY: 2,
                    sizeX: 2,
                    name: "Balance Anual",
                    chart: {
                        options: $scope.balanceMonthPaymentBarChart,
                        data: $scope.balanceMonthPaymentBarChartData,
                        api: {}
                    }
                }]
            };
        }, $scope.error);

    };

    //$scope.ViewDashBoard();

    // We want to manually handle `window.resize` event in each directive.
    // So that we emulate `resize` event using $broadcast method and internally subscribe to this event in each directive
    // Define event handler
    $scope.events = {
        resize: function (e, scope) {
            $timeout(function () {
                scope.api.update()
            }, 200)
        }
    };
    angular.element(window).on('resize', function (e) {
        $scope.$broadcast('resize');
    });

    // We want to hide the charts until the grid will be created and all widths and heights will be defined.
    // So that use `visible` property in config attribute
    $scope.config = {
        visible: false
    };
    $timeout(function () {
        $scope.config.visible = true;
    }, 200);

}]);