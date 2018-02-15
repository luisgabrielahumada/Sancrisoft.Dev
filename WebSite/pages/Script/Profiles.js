'use strict';

angular.module('App.Profiles', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/Profiles", {
        controller: "ProfilesCtrl",
        templateUrl: "Partial/Profiles.html"
    });
    $routeProvider.when("/Profiles/:Id", {
        controller: "ProfileCtrl",
        templateUrl: "Partial/Profiledtl.html"
    });

}])
.controller('ProfilesCtrl', ['$scope', 'serviceRest', 'breaDcrumb', function ($scope, serviceRest, breaDcrumb, $log) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.items = [];
    //Datos para paginacion
    $scope.pagination = {
        pageIndex: 1,
        pageSize: 10
    }
    //listar la grilla
    $scope.List = function (pageIndex) {
        $scope.pagination.pageIndex = pageIndex;
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Profiles/Get?pageIndex=' + $scope.pagination.pageIndex + '&pageSize=' + $scope.pagination.pageSize, function (response) {
            $scope.items = response.data.items;
            $scope.pagination.totalPage = response.data.totalPages;
            $scope.pagination.totalItemCount = response.data.totalItemCount;
        }, $scope.error).$promise;
    };


    $scope.Delete = function (id, status) {
        $scope.Rest.Patch($scope.Settings.Uri, 'Profiles/Patch/' + id + '?status=' + status, function (response) {
            $scope.ngNotify.set("Registro procesado exitosamente.", 'warn');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);

    };

    $scope.Remove = function (id) {
        $scope.Rest.Delete($scope.Settings.Uri, 'Profiles/Remove/' + id, null, function (response) {
            $scope.ngNotify.set("Registro eliminado con extio.", 'info');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);
    };

    $scope.List($scope.pagination.pageIndex);
}]);

App.controller('ProfileCtrl', ['$scope', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', function ($scope, serviceRest, breaDcrumb, $routeParams, $location) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    $scope.Id = $routeParams.Id;
    $scope.isValid = true;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }

    //Detalle de la pagina
    $scope.Get = function () {
        if ($routeParams.Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'Profiles/Get/' + $routeParams.Id, function (response) {
                $scope.item = response.data;
            }, $scope.error);
        }
    };

    //insertar o actualizar registro
    $scope.Save = function (Id) {
        if ($scope.myForm.$error.required) {
            $scope.isValid = false;
            $scope.ngNotify.set("Los campos en rojos son requeridos", 'error');
            return;
        }
        if (Id == undefined) {
            $scope.Rest.Post($scope.Settings.Uri, 'Profiles/Post', $scope.item,
                    function (response) {
                        $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
                        $location.path("/Profiles");
                    }, $scope.error);
        }
        if (Id != undefined) {
            $scope.Rest.Post($scope.Settings.Uri, 'Profiles/Put/' + Id, $scope.item,
                   function (response) {
                       $scope.ngNotify.set(String.format("Perfil {0} actualizado exitosamente.", $scope.item.Name), 'success');
                       $location.path("/Profiles");
                   }, $scope.error);
        }
    };

    $scope.Get();
}]);