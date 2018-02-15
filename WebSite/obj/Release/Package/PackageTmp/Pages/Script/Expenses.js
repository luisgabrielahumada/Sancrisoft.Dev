'use strict';

angular.module('App.Expenses', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest', 'angularModalService'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/Expenses", {
        controller: "ExpensesCtrl",
        templateUrl: "Partial/Expenses.html"
    });
}])

.controller('ExpensesCtrl', ['$scope', 'serviceRest', 'breaDcrumb', 'serviceLocalized', 'authService', 'ModalService', function ($scope, serviceRest, breaDcrumb, serviceLocalized, authService, ModalService) {
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.items = [];
    $scope.Total = 0;
    $scope.TotalMonth = 0;
    $scope.pagination = {
        pageIndex: 1,
        pageSize: 20
    }
    //listar la grilla
    $scope.List = function (pageIndex) {
        $scope.pagination.pageIndex = pageIndex;
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Expenses/Get?PageIndex=' + $scope.pagination.pageIndex + '&PageSize=' + $scope.pagination.pageSize, function (response) {
            $scope.items = response.data.items;
            $scope.pagination.totalPage = response.data.totalPages;
            $scope.pagination.totalItemCount = response.data.totalItemCount;
            $scope.GetTotal();
            $scope.GetTotalMonth();
        }, $scope.error).$promise;

    };

    $scope.Delete = function (id, status) {
        $scope.Rest.Patch($scope.Settings.Uri, 'Expenses/Patch/' + id + '?status=' + status, function (response) {
            $scope.ngNotify.set("Registro procesado exitosamente.", 'warn');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);

    };

    $scope.Remove = function (id) {
        $scope.Rest.Delete($scope.Settings.Uri, 'Expenses/Remove/' + id, null, function (response) {
            $scope.ngNotify.set("Registro eliminado con extio.", 'info');
            $scope.List($scope.pagination.pageIndex);
        }, $scope.error);
    };

    $scope.List($scope.pagination.pageIndex);

    $scope.GetTotal = function () {
        $scope.Total = 0;
        angular.forEach($scope.items, function (item, key) {
            if (item.Status)
                $scope.Total += item.Total
        });
    }
    $scope.GetTotalMonth = function () {
        $scope.TotalMonth = 0;
        angular.forEach($scope.items, function (item, key) {
            if (item.Status)
                $scope.TotalMonth += item.Value
        });
    }
    $scope.NewOrEdit = function (Id) {
        ModalService.showModal({
            templateUrl: "Partial/Modal/Expensesdtl.html",
            controller: "ExpensesdtlCtrl",
            inputs: {
                Id: Id
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.List($scope.pagination.pageIndex);
            });
        });
    };
}])

.controller('ExpensesdtlCtrl', ['$scope', 'close', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', 'Id', function ($scope, close, serviceRest, breaDcrumb, $routeParams, $location, Id) {
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.isValid = true;
    $scope.items = [];
    $scope.Save = function () {
        //if ($scope.myForm.$error.required) {
        //    $scope.isValid = false;
        //    $scope.ngNotify.set("Los campos en rojos son requeridos", 'error');
        //    return;
        //}
        //debugger;
        $scope.item.MonthsExpenses = [];
        angular.forEach($scope.items3, function (item, key) {
            if (item.Selected)
                $scope.item.MonthsExpenses.push({ "Value": item.Value });
        });
        if (Id == 0) {
            $scope.Rest.Post($scope.Settings.Uri, 'Expenses/Post', $scope.item,
                    function (response) {
                        $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
                        $scope.item.id = response.id;
                    }, $scope.error);
        }
        if (Id != 0) {
            $scope.Rest.Put($scope.Settings.Uri, 'Expenses/Put/' + Id, $scope.item,
                    function (response) {
                        $scope.ngNotify.set(String.format("El gasto {0} guardado exitosamente.", $scope.item.Name), 'success');
                    }, $scope.error);
        }
        $scope.Close();
    };

    $scope.Close = function (result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };

    $scope.GetMonths = function () {
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Common/GetMonths',
                function (response) {
                    $scope.items = response.data;
                }, $scope.error).$promise;
    };

    $scope.AddOrRemove = function (item, checked) {
        var q = $scope.items3.filter((item) => item.Value === item.Value);
    };
    $scope.Get = function () {
        $scope.items1 = [];
        $scope.items3 = [];
        $scope.GetMonths();
        if (Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'Expenses/Get/' + Id, function (response) {
                $scope.item = response.data;
                angular.forEach($scope.item.MonthsExpenses, function (item, key) {
                    $scope.items1.push({ "Key": item.Name, "Value": item.Value, "Selected": true });
                    $scope.items3.push({ "Key": item.Name, "Value": item.Value, "Selected": true });
                });

                angular.forEach($scope.items, function (value2, key2) {
                    var q = $scope.items1.filter((item) => item.Value != value2.Value);
                    if (q.length === $scope.items1.length)
                        $scope.items3.push({ "Key": value2.Key, "Value": value2.Value });
                });
                $scope.items = $scope.items3;
            }, $scope.error);
        }
    };

    $scope.Get();
}]);