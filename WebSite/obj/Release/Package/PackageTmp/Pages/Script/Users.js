'use strict';

angular.module('App.Users', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/Users", {
        controller: "UsersCtrl",
        templateUrl: "Partial/Users.html"
    });
    $routeProvider.when("/Users/:Id", {
        controller: "UserCtrl",
        templateUrl: "Partial/Userdtl.html"
    });

}])
.controller('UsersCtrl', ['$scope', 'serviceRest', 'breaDcrumb', function ($scope, serviceRest, breaDcrumb, $log) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set( data.Message,'error'); }
    $scope.items = [];
    $scope.pagination = {
        pageIndex: 1,
        pageSize: 10
    }
    //listar la grilla
    $scope.List = function (pageIndex) {
        $scope.pagination.pageIndex = pageIndex;
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Users/Get?PageIndex=' + $scope.pagination.pageIndex + '&PageSize=' + $scope.pagination.pageSize, function (response) {
            $scope.items = response.data.items;
            $scope.pagination.totalPage = response.data.totalPages;
            $scope.pagination.totalItemCount = response.data.totalItemCount;
        }, $scope.error).$promise; 
    };

    $scope.Delete= function (id, status) {
        $scope.Rest.Patch($scope.Settings.Uri, 'Users/Patch/' + id + '?status=' + status, function (response) {
            $scope.ngNotify.set("Registro procesado exitosamente.",'warn');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);

    };

    $scope.Remove = function (id) {
        $scope.Rest.Delete($scope.Settings.Uri, 'Users/Remove/' + id, null, function (response) {
            $scope.ngNotify.set("Registro eliminado con extio.",'info');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);
    };


    $scope.List($scope.pagination.pageIndex);
}]);

App.controller('UserCtrl', ['$scope', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', 'authService', function ($scope, serviceRest, breaDcrumb, $routeParams, $location, authService) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    $scope.isValid = true;
    $scope.Id = $routeParams.Id;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set( data.Message,'error'); }

    //Detalle de la pagina
    $scope.Get = function () {
        if ($routeParams.Id != 0) {
            $scope.Rest.Get( $scope.Settings.Uri, 'Users/Get/' + $routeParams.Id, function (response) {
                $scope.item = response.data;
            }, $scope.error);
        }
    };
   

    //insertar o actualizar registro
    $scope.Save = function (Id) {
        if ($scope.myForm.$error.required) {
            $scope.isValid = false;
            $scope.ngNotify.set("Los campos en rojos son requeridos",'error');
            return;
        }
        if (Id == undefined) {
            $scope.Rest.Post($scope.Settings.Uri, 'Users/Post', $scope.item,
                    function (response) {
                        $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
                        $location.path("/Users");
                    }, $scope.error);
        }
        if (Id != undefined) {
            $scope.Rest.Post($scope.Settings.Uri, 'Users/Put/' + Id, $scope.item,
                    function (response) {
                        $scope.ngNotify.set(String.format("Usuario {0} actualizado exitosamente.", $scope.item.UserName), 'success');
                        $location.path("/Users");
                    }, $scope.error);
        }
    };

    $scope.Profiles = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'Profiles/Get?PageIndex=1&PageSize=100',
                function (response) {
                    $scope.items = response.data.items;
                }, $scope.error);
    };
   
    $scope.Get();
    $scope.Profiles();
}]);