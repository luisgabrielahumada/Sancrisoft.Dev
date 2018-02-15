'use strict';
var Auth = angular.module('Auth', ['ngRoute',
                                    'ngAnimate',
                                    'angular-loading-bar',
                                    'LocalStorageModule',
                                    'serviceRest',
                                    'authService',
                                     'ngFileUpload',
                                    'ngNotify',
                                    'authInterceptorService',
                                    'Auth.directive-manager',
                                     'Auth.Login',
                                     'Auth.Signup',
                                     'Auth.RecoveryPassword',
                                     'Auth.Inscription'
]);
var directives = angular.module('Auth.directive-manager', []);




Auth.run(['$rootScope', 'serviceRest', 'authService', 'ngNotify', function ($rootScope, serviceRest, authService, ngNotify) {
    authService.settingApiServiceBase();
    $rootScope.Rest = serviceRest;
    $rootScope.Settings = authService.ApiSettings;

   // $rootScope.notificationManager = new NotificationManager($rootScope);
    $rootScope.ngNotify = ngNotify;
    ngNotify.config({
        theme: 'pure',
        position: 'bottom',
        duration: 3000,
        type: 'info',
        sticky: true,
        button: true,
        html: false
    });


}]);

//var serviceBase = 'http://localhost/Arquitectura.Api/Api';
//var serviceBase = 'http://arquitecturaapi-website.azurewebsites.net/Api';
Auth.constant('ngAuthSettings', 'authService', function (authService) {
    // apiServiceBaseUri: authService.ApiSettings.Uri
    //clientId: 'ngAuthApp'

});