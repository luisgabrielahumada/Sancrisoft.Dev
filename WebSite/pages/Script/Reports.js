'use strict';

angular.module('App.Reports', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/Reports", {
        controller: "ReportsCtrl",
        templateUrl: "Partial/Reports.html"
    });
    $routeProvider.when("/Reports/:Id", {
        controller: "ReportCtrl",
        templateUrl: "Partial/Reports.html"
    });
}])

.controller('ReportsCtrl', ['$scope', 'serviceRest', '$routeParams', 'breaDcrumb', '$http', '$rootScope', '$q', function ($scope, serviceRest, $routeParams, breaDcrumb, $http, $rootScope, $q) {
    breaDcrumb.breadcrumb();
    $scope.items = [];
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }

    $scope.ListReports = function () {
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'ConfigReports/GetItems', function (response) {
            $scope.items = response.data;
        }, $scope.error).$promise;
    };
    $scope.ListReports();
}])
.controller('ReportCtrl', ['$scope', 'serviceRest', '$routeParams', 'breaDcrumb', '$http', '$rootScope', '$q', function ($scope, serviceRest, $routeParams, breaDcrumb, $http, $rootScope, $q) {
    breaDcrumb.breadcrumb();
    $scope.items = [];
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    //Manejador de Errores
    $scope.error = function (data) { $scope.notifygrowl.error("Cargando Reporte", { title: 'error!' }); }
    $scope.isDashboard = true;
    $scope.ListReports = function () {
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'ConfigReports/GetItems', function (response) {
            $scope.items = response.data;
        }, $scope.error).$promise;
    };

    $scope.GetConfigurationReport = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'ConfigReports/Get/' + $routeParams.Id, function (response) {
            $scope.item = response.data;
            //generar token
            $scope.GetAccessToken();
            $scope.notifygrowl.info("Cargando Reporte", { title: 'Info!' });

        }, $scope.error);
    };

    $scope.GetAccessToken = function () {
        $http({
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            data: $scope.item,
            url: $scope.Settings.Uri + '/PowerBI/GetAccessToken'
        }).success(function (data) {
            $scope.GetReport(data);
        }).error(function (err) {
            var msg = "";
            if (err.Errors.InnerException != null)
                msg = err.Errors.InnerException.Message
            $scope.notifygrowl.error(err.Message + " " + msg + " " + err.Errors.Message, { title: 'error!' });
        })
    };

    $scope.GetReport = function (token) {
        $http({
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
            url: $scope.Settings.Uri + '/PowerBI/GetReport?reportName=' + $scope.item.Name + '&isDashboard=' + $scope.item.IsDashBoard + '&Workspace=' + $scope.AreaJob + '&accessToken=' + token.data
        }).success(function (data) {
            if (data.data == null) {
                $scope.notifygrowl.error("No se encontró ningún reporte...", { title: 'error!' });
                return false;
            }


            var models = window['powerbi-client'].models;
            var url = data.data;
            var ReportId = null;
            var _type = null;
            if (!$scope.item.IsDashBoard) {
                ReportId = new RegExp('[\\?&]reportId=([^&#]*)').exec(url)[1];
                _type = 'report';
            }
            if ($scope.item.IsDashBoard) {
                ReportId = new RegExp('[\\?&]dashboardId=([^&#]*)').exec(url)[1];
                _type = 'dashboard';
            }
            var permissions = models.Permissions.All;
            var config = {
                type: _type,
                tokenType: models.TokenType.Aad,
                accessToken: token.data,
                embedUrl: url,
                id: ReportId,
                permissions: permissions,
                settings: {
                    filterPaneEnabled: true,
                    navContentPaneEnabled: true
                }
            };
            var embedContainer = $('#embedContainer')[0];
            var report = powerbi.embed(embedContainer, config);
            $scope.notifygrowl.info("Proceso exitoso con Load del Reporte", { title: 'Info!' });
        }).error(function (err) {
            $scope.notifygrowl.error(err, { title: 'error!' });
        })
    }

    $scope.ListReports();

    $scope.GetConfigurationReport();
}]);
