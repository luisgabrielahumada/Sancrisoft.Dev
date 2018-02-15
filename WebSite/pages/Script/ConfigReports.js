'use strict';

angular.module('App.ConfigReports', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/ConfigReports", {
        controller: "ConfigReportsCrtl",
        templateUrl: "Partial/ConfigReports.html"
    });
    $routeProvider.when("/ConfigReports/:Id", {
        controller: "ConfigReportCtrl",
        templateUrl: "Partial/ConfigReportsdtl.html"
    });
}])
.controller('ConfigReportsCrtl', ['$scope', 'serviceRest', 'breaDcrumb', function ($scope, serviceRest, breaDcrumb) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
   
    $scope.error = function (data) {$scope.notifygrowl.error(data.Message, { title: 'error!' }); }
    $scope.items = [];

    $scope.pagination = {
        pageIndex: 1,
        pageSize: 10
    }
    $scope.List = function (pageIndex) {
        $scope.pagination.pageIndex = pageIndex;
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'ConfigReports/Get?PageIndex=' + $scope.pagination.pageIndex + '&PageSize=' + $scope.pagination.pageSize, function (response) {
            $scope.items = response.data.items;
            $scope.pagination.totalPage = response.data.totalPages;
            $scope.pagination.totalItemCount = response.data.totalItemCount;
        }, $scope.error).$promise;
    };

    $scope.Delete = function (id, status) {
        $scope.Rest.Patch($scope.Settings.Uri, 'ConfigReports/Patch/' + id + '?Status=' + status, function (response) {
            $scope.notifygrowl.info("Registro procesado exitosamente.", { title: 'info!' });
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);

    };

    $scope.Remove = function (id) {
        $scope.Rest.Delete($scope.Settings.Uri, 'ConfigReports/Remove/' + id, null, function (response) {
            $scope.notifygrowl.info("Registro eliminado con extio.", { title: 'info!' });
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);
    };

    $scope.List($scope.pagination.pageIndex);
}]);

App.controller('ConfigReportCtrl', ['$scope', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', 'authService', function ($scope, serviceRest, breaDcrumb, $routeParams, $location, authService) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    $scope.isValid = true;
    //Manejador de Errores
    $scope.error = function (data) { $scope.notifygrowl.error(data.Message, { title: 'error!' }); }

    //Detalle de la pagina
    $scope.Get = function () {
        if ($routeParams.Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'ConfigReports/Get/' + $routeParams.Id, function (response) {
                $scope.item = response.data;
            }, $scope.error);
        }
    };


    //insertar o actualizar registro
    $scope.Save = function () {
        if ($scope.myForm.$error.required) {
            $scope.isValid = false;
            $scope.notifygrowl.error("Los campos en rojos son requeridos", { title: 'error!' });
            return;
        }
        if ($routeParams.Id == 0) {
            $scope.Rest.Post($scope.Settings.Uri, 'ConfigReports/Post', $scope.item,
                    function (response) {
                        $scope.notifygrowl.success("Registro creado con exito.", { title: 'info!' });
                        $location.path("/ConfigReports");
                    }, $scope.error);
        }
        if ($routeParams.Id != 0) {
            $scope.Rest.Put($scope.Settings.Uri, 'ConfigReports/Put/' + $routeParams.Id, $scope.item,
                    function (response) {
                        $scope.notifygrowl.success(String.format("El Reporte {0} guardado exitosamente.", $scope.item.Name), { title: 'info!' });
                        $location.path("/ConfigReports");
                    }, $scope.error);
        }
    };
    $scope.Get();
}]);