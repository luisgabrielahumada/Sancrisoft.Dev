'use strict';

angular.module('Auth.Inscription', ['ngRoute', 'angular-loading-bar', 'ngAnimate', 'authService', 'serviceRest'])
.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when("/Inscription", {
        controller: "InscriptionCtrl",
        templateUrl: "Partial/Inscription.html"
    });
    $routeProvider.when("/Inscription/:Id", {
        controller: "InscriptiondtlCtrl",
        templateUrl: "Partial/Inscription.html"
    });
    $routeProvider.when("/Finalize", {
        controller: "FinalizeCtrl",
        templateUrl: "Partial/Finalize.html"
    });
}])
Auth.controller('InscriptionCtrl', ['$scope', 'serviceRest', '$routeParams', '$location', 'Upload', function ($scope, serviceRest, $routeParams, $location, Upload) {
    $scope.isValid = true;
    $scope.isShow = true;
    $scope.dir;
    var geocoder = new google.maps.Geocoder;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    function initMap () {
        $scope.promise = $.getJSON('http://api.wipmania.com/jsonp?callback=?', function (data) {
            $scope.geocodeLatLng(geocoder, data);
        }).$promise;
    };
   
   
    $scope.geocodeLatLng = function(geocoder,ubc) {
        var _lat = ubc.latitude;
        var _lng = ubc.longitude;
        var latlng = {
            lat: parseFloat(_lat),
            lng: parseFloat(_lng)
        };
        geocoder.geocode({
            'location': latlng
        }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var item = results[0].address_components;
                    $scope.item = {
                        country: item[3].long_name,
                        city: item[2].long_name,
                        zip: item[4].long_name,
                        state: item[1].long_name

                    };
            } else {
                console.log('Geocoder failed due to: ' + status);
            }
           
        });
    }
    //insertar o actualizar registro
    $scope.Save = function (Id) {
        if ($scope.myForm.$error.required) {
            $scope.isValid = false;
            $scope.ngNotify.set("Los campos en rojos son requeridos", 'error');
            return;
        }
        debugger;
        $scope.Rest.Post($scope.Settings.Uri, 'Inscriptions/Post', $scope.item,
                function (response) {
                    Upload.upload({
                        url: $scope.Settings.Uri + '/Upload/Post?type=Inscription&id=' + response.data,
                        data: { d: $scope.item.description, certificate: $scope.item.certificate, profile: $scope.item.imageProfile }
                    }).then(function (response) {
                        $location.path("/Finalize");
                    }, function (err) {
                        $scope.error;
                    });

                }, $scope.error);
    };

    $scope.GetCharges = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'Charges/Get?pageIndex=1&pageSize=100',
                function (response) {
                    $scope.items = response.data.items;
                }, $scope.error);
    };
    // $scope.GetAddress();
    initMap();
    $scope.GetCharges();
}]);


Auth.controller('InscriptiondtlCtrl', ['$scope', 'serviceRest', '$routeParams', '$location', 'authService', function ($scope, serviceRest, $routeParams, $location, authService) {
    $scope.isValid = true;
    $scope.isShow = false;
    //Manejador de Errores
    $scope.error = function (data) { $scope.ngNotify.set(data.Message, 'error'); }
    $scope.item = {
        Id: $routeParams.Id
    };
    //Detalle de la pagina
    $scope.Get = function () {
        if ($routeParams.Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'Inscriptions/Get/' + $routeParams.Id, function (response) {
                $scope.item = response.data;
            }, $scope.error);
        }
    };

    $scope.GetImg = function () {
        if ($routeParams.Id != 0) {
            $scope.Rest.Get($scope.Settings.Uri, 'Upload/GetImg/' + $routeParams.Id, function (response) {
                $scope.img = response.data;
            }, $scope.error);
        }
    };

    $scope.GetCharges = function () {
        $scope.Rest.Get($scope.Settings.Uri, 'Charges/Get?pageIndex=1&pageSize=100',
                function (response) {
                    $scope.items = response.data.items;
                }, $scope.error);
    };
    $scope.GetCharges();
    $scope.Get();
    $scope.GetImg();
}]);


Auth.controller('FinalizeCtrl', ['$scope', 'serviceRest', '$routeParams', '$location', 'authService', function ($scope, serviceRest, $routeParams, $location, authService) {
    
}])


