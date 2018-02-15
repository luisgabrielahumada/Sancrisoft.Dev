'use strict';

angular.module('App.Smtp', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/Smtp", {
        controller: "SmtpCtrl",
        templateUrl: "Partial/Smtp.html"
    });

    $routeProvider.when("/Smtp2/:Id", {
        controller: "Smtp2Ctrl",
        templateUrl: "Partial/Smtp2.html"
    });

}])
.controller('SmtpCtrl', ['$scope', 'serviceRest', 'breaDcrumb', function ($scope, serviceRest, breaDcrumb) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message,'error'); }
    $scope.items = [];
    //Datos para paginacion
    $scope.pagination = {
        pageIndex: 1,
        pageSize: 10
    }
    //listar la grilla
    $scope.List = function (pageIndex) {
        $scope.pagination.pageIndex = pageIndex;
        $scope.promise = $scope.Rest.Get( $scope.Settings.Uri, 'Smtp/Get?pageIndex=' + $scope.pagination.pageIndex + '&pageSize=' + $scope.pagination.pageSize, function (response) {
            $scope.items = response.data.items;
            $scope.pagination.totalPage = response.data.totalPages;
            $scope.pagination.totalItemCount = response.data.totalItemCount;
        }, $scope.error).$promise;
    };


    $scope.goStatus = function (id, status) {
        $scope.Rest.Patch($scope.Settings.Uri, 'Smtp/Patch/' + status + '/' + id, function (response) {
            $scope.ngNotify.set("Registro procesado exitosamente.",'warn');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);

    };

    $scope.Delete = function (id) {
        $scope.Rest.Delete($scope.Settings.Uri, 'Smtp/Delete/' + id, null, function (response) {
            $scope.ngNotify.set("Registro eliminado con extio.",'info');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);
    };

    $scope.List($scope.pagination.pageIndex);
}]);


App.controller('Smtp2Ctrl', ['$scope', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', function ($scope, serviceRest, breaDcrumb, $routeParams, $location) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    $scope.isValid = true;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message,'error'); }

    //Detalle de la pagina
    $scope.Get = function () {
        if ($routeParams.Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'Smtp/Get/' + $routeParams.Id, function (response) {
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
        debugger;
        $scope.Rest.Post($scope.Settings.Uri, 'Smtp/Post', $scope.item,
                function (response) {
                    $scope.ngNotify.set( "Registro guardado exitosamente.",'success');
                    $location.path("/Smtp");
                }, $scope.error);
    };
    $scope.Get();
}]);