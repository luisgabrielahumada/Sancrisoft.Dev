'use strict';

angular.module('App.NewSaleOrder', ['ngRoute', 'App.SettingServices', 'App.SettingServices', 'App.NotificationClient', 'angular-loading-bar', 'ngAnimate', 'authService', 'breaDcrumb', 'serviceRest', 'angularModalService'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/NewSaleOrder", {
        controller: "NewSaleOrderCtrl",
        templateUrl: "Partial/NewSaleOrder.html"
    });
    $routeProvider.when("/NewSaleOrder/:Id", {
        controller: "NewSaleOrderCtrl",
        templateUrl: "Partial/NewSaleOrder.html"
    });
}])
.controller('NewSaleOrderCtrl', ['$scope', 'Setting', '$routeParams', 'SignalrService', '$location', 'ModalService', 'serviceRest', 'breaDcrumb', function ($scope, Setting, $routeParams, SignalrService, $location, ModalService, serviceRest, breaDcrumb) {
    $scope.today = new Date();
    $scope.isDisabled = true;
    breaDcrumb.breadcrumb();
    $scope.pageCurrent = breaDcrumb.pages.pageCurrent;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.data = {
        StatusOrders: undefined,
        Transaction: $scope.today
    };

    $scope.SaleOrder_Id = $routeParams.Id;

    $scope.items = [];
    $scope.TypeDocuments = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'Common/GetTypeDocuments',
                function (response) {
                    $scope.rows = response.data;
                }, $scope.error);
    };

    $scope.GetStatusOrder = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'Common/GetStatusOrder',
                function (response) {
                    $scope.rowstatus = response.data;
                }, $scope.error);
    };

    $scope.GetStatusTransaction = function () {
        $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Common/GetStatusTransaction',
                function (response) {
                    $scope.transactionstatus = response.data;
                }, $scope.error).$promise;
    };
    //listar la grilla
    $scope.Get = function () {
        //$scope.GetStatusTransaction();
        if ($scope.SaleOrder_Id != undefined) {
           
            $scope.Rest.Get($scope.Settings.Uri, 'SaleOrders/Get/' + $scope.SaleOrder_Id, function (response) {
                $scope.data = response.data;
                $scope.customer = response.data.Customer;
                $scope.items = response.data.SaleOrderItem;
                $scope.TypeDocument = $scope.customer.TypeDocument;
                $scope.Document = $scope.customer.Document;
                $scope.SaleOrder_Id = $scope.data.Id;
            }, $scope.error);
        }
    };
    //Modal de Cliente
    $scope.NewOrEdit = function (Id) {
        ModalService.showModal({
            templateUrl: "Partial/Modal/Customersdtl.html",
            controller: "CustomerCtrl",
            inputs: {
                Id: $scope.Document,
                Type: $scope.TypeDocument
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.Get();
            });
        });
    };

    $scope.Payment = function () {
        ModalService.showModal({
            templateUrl: "Partial/Modal/PaymentOrder.html",
            controller: "PaymentOrderCtrl",
            inputs: {
                data: $scope.data
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.Get();
            });
        });
    };

    $scope.LisPayment = function () {
        ModalService.showModal({
            templateUrl: "Partial/Modal/PaymentOrders.html",
            controller: "PaymentOrdersCtrl",
            inputs: {
                data: $scope.data.PaymentOrder,
                number: $scope.data.Number,
                priceTotal: $scope.data.PriceTotal,
                pricePending: $scope.data.PricePending,
                SaleOrder_Id: $scope.data.Id
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.Get();
            });
        });
    };
    //Model busqueda de cliente
    $scope.SearchCustomer = function () {
        if ($scope.TypeDocument == undefined) {
            $scope.ngNotify.set("Debe seleccionar un tipo documento.", 'error');
            return false;
        }

        if ($scope.Document == undefined) {
            $scope.ngNotify.set("Debe ingresar el numero documento.", 'error');
            return false;
        }

        $scope.Rest.Get($scope.Settings.Uri, 'Customers/GetWhereDocument?id=' + $scope.Document + '&type=' + $scope.TypeDocument, function (response) {
            $scope.customer = response.data;
        }, $scope.error);
    };
    //SearchProductCode
    $scope.SearchProductCode = function (data) {

        $scope.Rest.Get($scope.Settings.Uri, 'Products/GetWhere?Code=' + $scope.Code + '&Name=', function (response) {
            $scope.item = response.data[0]
            $scope.Rest.Get($scope.Settings.Uri, 'Inventory/GetInvetoryProduct/' + $scope.item.Id, function (response) {
                $scope.product = response.data;
                $scope.Code = $scope.product.Code;
                $scope.Rate = $scope.product.PriceSale;
                $scope.Product_Id = $scope.product.Id;
                $scope.Code = $scope.Code;
                $scope.Name = $scope.Name;
            }, $scope.error);
        }, $scope.error);
    };
    //Model busqueda producto
    $scope.SearchProduct = function () {
        ModalService.showModal({
            templateUrl: "Partial/Modal/SearchProduct.html",
            controller: "SearchProductCtrl",
            //preClose: (modal) => { modal.element.modal('hide'); },
            inputs: {
                Code: $scope.Code
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                if (result) {
                    $scope.product = result;
                    $scope.Code = result.Code;
                    $scope.Product_Id = result.Id;
                    $scope.Rate = result.PriceSale;
                    $scope.ServiceType = result.ServiceType;
                }
            });
        });
    };

    $scope.NewOrder = function () {
        $scope.SaleOrder_Id = undefined;
        $location.path("/NewSaleOrder");
    };

    $scope.EditItem = function () {
        $scope.isDisabled = false;
    };

    $scope.Clear = function () {
        $scope.Code = "";
        $scope.Unit = "";
        $scope.Rate = "";
    };

    $scope.Save = function () {
        //Validate
        if ($scope.data.StatusOrders == undefined) {
            $scope.ngNotify.set("Debe seleccionar un tipo orden.", 'error');
            return false;
        }
        if ($scope.TypeDocument == undefined) {
            $scope.ngNotify.set("Debe seleccionar un tipo documento.", 'error');
            return false;
        }

        if ($scope.Document == undefined) {
            $scope.ngNotify.set("Debe ingresar el numero documento.", 'error');
            return false;
        }

        if ($scope.SaleOrder_Id == undefined) {
            if ($scope.Code == undefined) {
                $scope.ngNotify.set("Debe ingresar el código del producto.", 'error');
                return false;
            }
            if ($scope.Unit == undefined) {
                $scope.ngNotify.set("Debe ingresar unidades.", 'error');
                return false;
            }
            $scope.Order = {
                Customer_Id: $scope.customer.Id,
                Discount: $scope.data.Discount,
                Description: $scope.data.Description,
                Transaction: $scope.data.Transaction,
                StatusOrders: $scope.data.StatusOrders,
                StatusTransaction: $scope.data.StatusTransaction
            };
            $scope.Rest.Post($scope.Settings.Uri, 'SaleOrders/Post', $scope.Order,
                     function (response) {
                         $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
                         $scope.SaleOrder_Id = response.data;
                         $location.path("/NewSaleOrder/" + $scope.SaleOrder_Id);

                         // add firt line
                         $scope.OrderItem = {
                             Product_Id: $scope.Product_Id,
                             SaleOrder: { Id: $scope.SaleOrder_Id },
                             Unit: $scope.Unit,
                             PriceSalebyUnit: $scope.Rate,
                             Utility: $scope.data.Utility,
                         };
                         $scope.Rest.Post($scope.Settings.Uri, 'SaleOrderItems/Post', $scope.OrderItem,
                              function (response) {
                                  $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
                                  $scope.Clear();
                              }, $scope.error);
                         $scope.Get();
                     }, $scope.error);

        } else {
            $scope.Order = {
                Customer_Id: $scope.customer.Id,
                Discount: $scope.data.Discount,
                Description: $scope.data.Description,
                Transaction: $scope.data.Transaction,
                StatusOrders: $scope.data.StatusOrders,
                PriceTotal: $scope.data.PriceTotal,
                StatusTransaction: $scope.data.StatusTransaction
            };
            $scope.Rest.Post($scope.Settings.Uri, 'SaleOrders/Put/' + $scope.SaleOrder_Id, $scope.Order,
                     function (response) {
                         $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
                     }, $scope.error);
        }

    };

    $scope.Add = function () {
        if ($scope.SaleOrder_Id == undefined) {
            if ($scope.data.StatusOrders == undefined) {
                $scope.ngNotify.set("Debe seleccionar un tipo orden.", 'error');
                return false;
            }
            if ($scope.TypeDocument == undefined) {
                $scope.ngNotify.set("Debe seleccionar un tipo documento.", 'error');
                return false;
            }

            if ($scope.Document == undefined) {
                $scope.ngNotify.set("Debe ingresar el numero documento.", 'error');
                return false;
            }

            if ($scope.Code == undefined) {
                $scope.ngNotify.set("Debe ingresar el código del producto.", 'error');
                return false;
            }
            if ($scope.Unit == undefined) {
                $scope.ngNotify.set("Debe ingresar unidades.", 'error');
                return false;
            }
            $scope.Order = {
                Customer_Id: $scope.customer.Id,
                Discount: $scope.customer.Discount,
                Description: $scope.data.Description,
                Transaction: $scope.data.Transaction,
                StatusOrders: $scope.data.StatusOrders,
                StatusTransaction: 0
            };
            $scope.Rest.Post($scope.Settings.Uri, 'SaleOrders/Post', $scope.Order,
                    function (response) {
                        $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
                        $scope.SaleOrder_Id = response.data;
                        $location.path("/NewSaleOrder/" + $scope.SaleOrder_Id);
                        //$scope.taxeOrder = [];
                        //angular.forEach($scope.product.Taxe, function (value, key) {
                        //    var taxeOrder = {
                        //        Code: value.Code,
                        //        Name: value.Name,
                        //        Parent: value.Parent,
                        //        ServiceType: value.ServiceType,
                        //        Type: value.Type,
                        //        UpdatedId: value.UpdatedId,
                        //        Value: value.Value
                        //    }
                        //    $scope.taxeOrder.push(taxeOrder);
                        //});
                        $scope.OrderItem = {
                            Product_Id: $scope.Product_Id,
                            SaleOrder: { Id: $scope.SaleOrder_Id },
                            Unit: $scope.Unit,
                            PriceSalebyUnit: $scope.Rate,
                            Utility: $scope.product.Utility
                            };
                        $scope.Rest.Post($scope.Settings.Uri, 'SaleOrderItems/Post', $scope.OrderItem,
                             function (response) {
                                 $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
                             }, $scope.error);
                        $scope.Get();
                    }, $scope.error);

        } else {
            if ($scope.Code == undefined) {
                $scope.ngNotify.set("Debe ingresar el código del producto.", 'error');
                return false;
            }
            if ($scope.Unit == undefined) {
                $scope.ngNotify.set("Debe ingresar unidades.", 'error');
                return false;
            }
            //$scope.taxeOrder = [];
            //angular.forEach($scope.product.Taxe, function (value, key) {
            //    var taxeOrder = {
            //        Code: value.Code,
            //        Name: value.Name,
            //        Parent: value.Parent,
            //        ServiceType: value.ServiceType,
            //        Type: value.Type,
            //        UpdatedId: value.UpdatedId,
            //        Value: value.Value
            //    }
            //    $scope.taxeOrder.push(taxeOrder);
            //});
            $scope.OrderItem = {
                Product_Id: $scope.Product_Id,
                SaleOrder: { Id: $scope.SaleOrder_Id },
                Unit: $scope.Unit,
                PriceSalebyUnit: $scope.Rate,
                Utility: $scope.product.Utility,
                ServiceType: $scope.ServiceType
            };
            $scope.Rest.Post($scope.Settings.Uri, 'SaleOrderItems/Post', $scope.OrderItem,
                  function (response) {
                      $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
                      $scope.Get();
                  }, $scope.error);
        }
    };

    $scope.Update = function () {
        $scope.SaleOrderItem = [];
        $scope.SaleOrderItem = $scope.items.filter(function (e) {
            return (e.disable == true);
        }).map(function (t) {
            return t;
        }).sort();

        $scope.Rest.Post($scope.Settings.Uri, 'SaleOrderItems/Bath/' + $scope.SaleOrder_Id, $scope.SaleOrderItem,
                     function (response) {
                         $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
                         $scope.Get();
                     }, $scope.error);


    };

    $scope.Delete = function (id, status) {
        $scope.Rest.Patch($scope.Settings.Uri, 'SaleOrderItems/Patch/' + id + '?Status=' + status, function (response) {
            $scope.ngNotify.set("Registro procesado exitosamente.", 'warn');
            $scope.Get();
        }, $scope.error);

    };
    //NotificationStream.on('addNotification', function (data) {
    //    $scope.items.push(JSON.stringify(data));
    //});
    $scope.GetStatusTransaction();
    $scope.TypeDocuments();
    $scope.GetStatusOrder();
    $scope.Get();
}])


.controller('CustomerCtrl', ['$scope', 'close', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', 'Id', 'Type', function ($scope, close, serviceRest, breaDcrumb, $routeParams, $location, Id, Type) {
    $scope.isValid = true;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }

    $scope.TypeDocuments = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'Common/GetTypeDocuments',
                function (response) {
                    $scope.rows = response.data;
                }, $scope.error);
    };

    $scope.Save = function () {
        $scope.Rest.Post($scope.Settings.Uri, 'Customers/Post', $scope.item,
                function (response) {
                    $scope.ngNotify.set("Registro guardado exitosamente.", 'success');
                }, $scope.error);
    };

    $scope.Close = function (result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };

    $scope.TypeDocuments();
}])


.controller('PaymentOrderCtrl', ['$scope', 'close', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', 'data', function ($scope, close, serviceRest, breaDcrumb, $routeParams, $location, data) {
    //Manejador de Errores
    $scope.isValid = true;
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.data = data;
    $scope.PricePayment = "";
    $scope.FormatPayment = 0;
    $scope.goPrice = function () {

        if ($scope.data.PricePending > 0) {
            if ($scope.PricePayment >= $scope.data.PricePending) {
                $scope.PriceReturn = $scope.PricePayment - $scope.data.PricePending;
            } else {
                $scope.PriceReturn = $scope.data.PricePending - $scope.PricePayment;
            }
        } else {
            if ($scope.PricePayment >= $scope.data.PriceTotal) {
                $scope.PriceReturn = $scope.PricePayment - $scope.data.PriceTotal;
            } else {
                $scope.PriceReturn = $scope.data.PriceTotal - $scope.PricePayment;
            }
        }
    };

    $scope.formatPayment = function (type) {
        $scope.FormatPayment = type;
    };

    $scope.Save = function () {
        if ($scope.PricePayment == undefined || $scope.PricePayment == 0) {
            $scope.notifygrowl.error("Debe ingresar el valor a pagar", { title: 'Error!' });
            return false;
        }
        $scope.item = {
            SaleOrder: {
                Id: $scope.data.Id
            },
            Payment: $scope.FormatPayment,
            PricePayment: $scope.PricePayment,
            PricePending: $scope.PriceReturn,
            Observation: $scope.Observation,
            VoucherCard: $scope.VoucherCard
        };
        $scope.Rest.Post($scope.Settings.Uri, 'PaymentOrder/Post', $scope.item,
                function (response) {
                    $scope.notifygrowl.success("Registro guardado exitosamente.", { title: 'Success!' });
                    $scope.PricePayment = "";
                    $scope.FormatPayment = 0;
                    $scope.PriceReturn = "";
                }, $scope.error);
    };

    $scope.Close = function (result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };
}])

.controller('PaymentOrdersCtrl', ['$scope', 'close', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', 'SaleOrder_Id', 'data', 'number', 'priceTotal', 'pricePending', function ($scope, close, serviceRest, breaDcrumb, $routeParams, $location, SaleOrder_Id, data, number, priceTotal, pricePending) {
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.items = [];
    $scope.items = data;
    $scope.SaleOrder_Id = SaleOrder_Id;
    $scope.number = number;
    $scope.priceTotal = priceTotal;
    $scope.pricePending = pricePending;

    $scope.Close = function (result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };

    $scope.Remove = function (id) {
        $scope.Rest.Delete($scope.Settings.Uri, 'PaymentOrder/Remove/' + id, null, function (response) {
            $scope.notifygrowl.success("Registro eliminado con extio.", { title: 'Ok!' });
            $scope.List();
        }, $scope.error);
    };

    $scope.List = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'PaymentOrder/Get/' + $scope.SaleOrder_Id, function (response) {
            $scope.items = response.data;
        }, $scope.error);
    };
}])

.controller('SearchProductCtrl', ['$scope', 'close', 'serviceRest', 'breaDcrumb', '$routeParams', '$location', 'Code',
    function ($scope, close, serviceRest, breaDcrumb, $routeParams, $location, Code) {
        //Manejador de Errores
        $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
        $scope.items = [];
        $scope.Code = Code == undefined ? "" : Code;
        $scope.Name = "";
        //Detalle de la pagina k,l 
        $scope.List = function () {
            $scope.promise = $scope.Rest.Get($scope.Settings.Uri, 'Products/GetWhere?Code=' + $scope.Code + '&Name=' + $scope.Name, function (response) {
                $scope.items = response.data;
            }, $scope.error).$promise;
        };

        $scope.SelectedItem = function (item) {
            $scope.Rest.Get($scope.Settings.Uri, 'Inventory/GetInvetoryProduct/' + item.Id, function (response) {
                $scope.item = response.data;
                $scope.Close($scope.item);
            }, $scope.error);
            // close, but give 500ms for bootstrap to animate
        };

        $scope.Close = function (result) {
            //$uibModalInstance.close(result);
            close(result, 500); // close, but give 500ms for bootstrap to animate
        };
    }]);