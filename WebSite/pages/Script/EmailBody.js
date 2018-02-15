'use strict';

angular.module('App.EmailBody', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/EmailBody", {
        controller: "EmailBodysCtrl",
        templateUrl: "Partial/EmailBodys.html"
    });

    $routeProvider.when("/EmailBody/:Id", {
        controller: "EmailBodyCtrl",
        templateUrl: "Partial/EmailBody.html"
    });

}])
.controller('EmailBodysCtrl', ['$scope', 'serviceRest', 'breaDcrumb', function ($scope, serviceRest, breaDcrumb) {
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
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'EmailBody/Get?pageIndex=' + $scope.pagination.pageIndex + '&pageSize=' + $scope.pagination.pageSize, function (response) {
            $scope.items = response.data.items;
            $scope.pagination.totalPage = response.data.totalPages;
            $scope.pagination.totalItemCount = response.data.totalItemCount;
        }, $scope.error).$promise;
    };


    $scope.goStatus = function (id, status) {
        $scope.Rest.Patch($scope.Settings.Uri, 'EmailBody/Patch/' + status + '/' + id, function (response) {
            $scope.ngNotify.set("Registro procesado exitosamente.",'warn');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);

    };


    $scope.List($scope.pagination.pageIndex);
}]);


App.controller('EmailBodyCtrl', ['$scope', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', 'Upload', function ($scope, serviceRest, breaDcrumb, $routeParams, $location, Upload) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    $scope.isValid = true;
    $scope.Id = $routeParams.Id == undefined ? 0 : $routeParams.Id;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set( data.Message,'error'); }

    //Detalle de la pagina
    $scope.Get = function () {
        if ($routeParams.Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'EmailBody/Get/' + $routeParams.Id, function (response) {
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
        Upload.upload({
            url: $scope.Settings.Uri + '/Upload/Post?type=' + $scope.item.cd_email_to,
            data: { ds_upload: $scope.item.ds_upload }
        })
          .then(function (response) {
              $scope.Rest.Post($scope.Settings.Uri, 'EmailBody/Post', $scope.item,
               function (response) {
                   $scope.ngNotify.set("Registro guardado exitosamente.",'success');
                   $location.path("/EmailBody");
               }, $scope.error);
          }, function (err) {
              $scope.ngNotify.set(err.data.Message,'error');
          });

    };

    $scope.DeleteFile = function (cd_upload) {
        $scope.Rest.Delete($scope.Settings.Uri, 'Upload/Delete/' +cd_upload, null, function (response) {
            $scope.ngNotify.set("Registro procesado exitosamente.",'warn');
            $scope.Get();
        }, $scope.error);
    };
    $scope.DownloadFile = function (cd_upload) {
        $scope.Rest.Get($scope.Settings.Uri, 'Upload/Get/' + cd_upload, function (response) {
            $scope.ngNotify.set("Registro descargado exitosamente.",'warn');
        }, $scope.error);
    };
    $scope.Get();
}]);