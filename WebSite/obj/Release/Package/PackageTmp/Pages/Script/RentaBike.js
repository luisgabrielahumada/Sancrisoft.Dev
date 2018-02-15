'use strict';

angular.module('App.RentaBike', ['ngRoute', 'App.SettingServices', 'App.SettingServices', 'App.NotificationClient', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest', 'angularModalService'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/RentaBike", {
        controller: "RentaBikesCtrl",
        templateUrl: "Partial/RentaBike.html"
    });
}])
.controller('RentaBikesCtrl', ['$scope', 'Setting', 'SignalrService', 'ModalService', 'serviceRest', 'breaDcrumb', function ($scope, Setting, SignalrService, ModalService, serviceRest, breaDcrumb) {
    SignalrService.initialize($scope, function (data) {
        var item = JSON.parse(data.Data);
        switch (data.Code) {
            case "INSERT":
                $scope.ngNotify.set(String.format("Nueva Renta ha ingresado al sistema, {0} código {1}", item.ItemRentar[0].Name, item.ItemRentar[0].Code), 'info');
                $scope.items.reverse();
                $scope.items.push(item);
                $scope.items.reverse();
                break;
            case "UPDATE":
                $scope.ngNotify.set(String.format("Actualización de Renta, {0} código {1}", item.ItemRentar[0].Name, item.ItemRentar[0].Code), 'info');
                for (var i = 0; i < $scope.items.length; i++) {
                    if ($scope.items[i].Id === item.Id) {
                        return $scope.items[i] = item;
                    }
                }
                break;
            case "DELETE":
                $scope.ngNotify.set("Renta Eliminada", 'warn');
                for (var i = 0; i < $scope.items.length; i++) {
                    if ($scope.items[i].Id === item.Id) {
                        $scope.items.splice(i, 1);
                    }
                }
                break;
        }
    }, Setting.getNotificationsHubUri());
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.items = [];

    //listar la grilla
    $scope.List = function () {
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Rentar/Get?PageIndex=1&PageSize=999999', function (response) {
            $scope.items = response.data;
        }, $scope.error).$promise;
    };


    $scope.Delete = function (id, status) {
        $scope.Rest.Patch($scope.Settings.Uri, 'Rentar/Patch/' + id + '?status=' + status, function (response) {
            $scope.ngNotify.set("Registro procesado exitosamente.", 'warn');
            $scope.List();
        }, $scope.error);
    };

    $scope.Ok = function (Id) {
        $scope.Rest.Put($scope.Settings.Uri, 'Rentar/Put/' + Id, null,
               function (response) {
                   $scope.ngNotify.set("Renta Terminada con Exito", 'warn');
                   $scope.List();
               }, $scope.error);
    };

    $scope.Closed = function (Id) {
        $scope.Rest.Put($scope.Settings.Uri, 'Rentar/Closed/' + Id, null,
               function (response) {
                   $scope.ngNotify.set("Liquidacion realizada con Exito", 'success');
                   $scope.List();
               }, $scope.error);
    };
    //Modal de Colores
    $scope.NewOrEdit = function (Id) {
        ModalService.showModal({
            templateUrl: "Partial/Modal/RentaBikedtl.html",
            controller: "RentaBikeCtrl",
            inputs: {
                Id: Id
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.List();
            });
        });
    };

    //NotificationStream.on('addNotification', function (data) {
    //    $scope.items.push(JSON.stringify(data));
    //});
    $scope.List();
}]);


App.controller('RentaBikeCtrl', ['$scope', 'close', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', 'Id', function ($scope, close, serviceRest, breaDcrumb, $routeParams, $location, Id) {
    //breaDcrumb.breadcrumb();
    //$scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    $scope.isValid = true;
    $scope.IsNewCustomer = false;
    $scope.IsEditCustomer = false;
    $scope.ICustomer;
    $scope.IInventory;
    $scope.IsBlock = true;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }

    //Detalle de la pagina
    $scope.Get = function () {
        if (Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'Rentar/Get/' + Id, function (response) {
                $scope.item = response.data;
                $scope.item.Inventory_Id = $scope.item.ItemRentar[0].Inventory_Id;
                $scope.item.Rate = $scope.item.PaymentPartial;
                $scope.item.Time = $scope.item.ItemRentar[0].Time;
                $scope.IsBlock = false;
                $scope.IsEditCustomer = true;
            }, $scope.error);

        }
    };
    $scope.Close = function (result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };
    $scope.NewCustomer = function () {
        $scope.IsNewCustomer = true;
    };
    $scope.CancelCustomer = function () {
        $scope.IsNewCustomer = false;
    };
    //insertar o actualizar registro
    $scope.InventoryBike = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'Inventory/Get?pageIndex=1&pageSize=9999',
                function (response) {
                    $scope.itembike = response.data.items;
                }, $scope.error);
    };

    $scope.Save = function () {
        if ($scope.item.Customer != undefined)
            $scope.ICustomer = JSON.parse($scope.item.Customer);
        var data = {
            Document: $scope.ICustomer == undefined ? $scope.item.DocumentCode : $scope.ICustomer.Document,
            StatusRentar: "0",
            Quality: $scope.item.Quality == undefined ? 1 : $scope.item.Quality,
            FirstName: $scope.item.FirstName,
            LastName: $scope.item.LastName,
            Items: {
                Code: $scope.IInventory.Code,
                Time: $scope.item.Time,
                Rate: $scope.item.Rate
            }
        };
        $scope.Rest.Post($scope.Settings.Uri, 'Rentar/Post/' + Id, data,
               function (response) {
                   $scope.ngNotify.set("Renta Realizada con Exito", 'warning');
                   $scope.Close();
               }, $scope.error);
    };

    $scope.Calculate = function () {
        $scope.IInventory = JSON.parse($scope.item.Inventory);
        $scope.item.Rate = $scope.item.Time * $scope.IInventory.Rate;
    };
    $scope.Customers = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'Customer/Get?pageIndex=1&pageSize=9999',
                function (response) {
                    $scope.customers = response.data.items;
                }, $scope.error);
    };
    $scope.InventoryBike();
    $scope.Customers();
    $scope.Get();
}]);