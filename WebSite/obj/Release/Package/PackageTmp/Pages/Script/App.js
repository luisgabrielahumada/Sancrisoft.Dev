/*'hljs', hljsServiceProvider,*/
var directives = angular.module('App.directive-manager', []);
var App = angular.module('App', ['ngRoute', 'ui.select', 'ngSanitize', 'nvd3',
                                        'angularModalService',
                                        'angularjs-datetime-picker',
                                        'angular-loading-bar',
                                        'ngAnimate',
                                        'confirm-click',
                                        'ngNotify',
                                        'cgNotify',
                                        'angular-growl',
                                        'LocalStorageModule',
                                        'serviceRest',
                                        'authService',
                                        'breaDcrumb',
                                        'ngFileUpload',
                                        'authInterceptorService',
                                        'serviceLocalized',
                                        'App.directive-manager',
                                        'App.examples',
                                        'App.Home',
                                        'App.Unauthorized',
                                        'App.Cities',
                                        'App.Countries',
                                        'App.Menus',
                                        'App.ProfileUser',
                                        'App.Users',
                                        'App.Profiles',
                                        'App.Permissions',
                                        'App.Parameters',
                                        'App.Smtp',
                                        'App.MessagesLog',
                                        'App.Inventory',
                                        'App.TypesBike',
                                        'App.RentaBike',
                                        'App.RentaBikeHistory',
                                        'App.Customers',
                                        'App.Providers',
                                        'App.Products',
                                        'App.Inventory',
                                        'App.SaleOrders',
                                        'App.NewSaleOrder',
                                        'App.Reports',
                                        'App.ConfigReports',
                                        'App.Taxes',
                                        'App.Resolutions',
                                        'App.Income',
                                        'App.Expenses',
                                        'App.ApplyTransaction',
                                        'App.BalanceGeneral',
                                        'App.Inscription'
]);

App.config(function ($httpProvider, $routeProvider, cfpLoadingBarProvider, $locationProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
    //$routeProvider.otherwise({ redirectTo: '/Home' });

    /* hljsServiceProvider.setOptions({
         // replace tab with 2 spaces
         tabReplace: '  '
     });*/
    //cfpLoadingBarProvider.includeBar = false;
    //cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    $routeProvider.otherwise({ redirectTo: "/Home" });
    $locationProvider.html5Mode(false);
})
.run(['authService', '$rootScope', 'serviceRest', 'serviceLocalized', 'ngNotify', 'growl', 'notify', '$http', function (authService, $rootScope, serviceRest, serviceLocalized, ngNotify, growl, notify, $http) {
    authService.fillAuthData();
    authService.settingApiServiceBase();
    $rootScope.Rest = serviceRest;
    $rootScope.Settings = authService.ApiSettings;
   // $rootScope.notificationManager = new NotificationManager($rootScope);
    ngNotify.config({
        theme: 'pure',
        position: 'bottom',
        duration: 10000,
        type: 'info',
        sticky: true,
        button: true,
        html: false
    });
    notify.config({
        position: 'right',
        duration: 10000,
        maximumOpen: 1
    });
    $rootScope.ngNotify = ngNotify;
    $rootScope.notify = notify;
    $rootScope.notifygrowl = growl;
   // Initialize($rootScope, $http);
}]);
function Initialize($rootScope, $http) {
    $http.get('../app-config.json').success(function (data) {
        $rootScope.powerbi = data
    }).error(function (err) {
        console.log("Ocurring an error loading configuration: " + data);
    })
}
//var serviceBase = 'http://localhost/Arquitectura.Api/Api';
//var serviceBase = 'http://arquitecturaapi-website.azurewebsites.net/Api';
App.constant('ngAuthSettings', 'authService', function (authService) {
    //apiServiceBaseUri: authService.ApiSettings.Uri
    //clientId: 'ngAuthApp'

});


