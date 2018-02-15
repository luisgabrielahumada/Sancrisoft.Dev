'use strict';
angular.module('authInterceptorService', [])
.factory('authInterceptorService', ['$q', '$injector', '$location', 'localStorageService', function ($q, $injector, $location, localStorageService) {

    var authInterceptorServiceFactory = {};

    var _request = function (config) {
        config.headers = config.headers || {};
        var authData = localStorageService.get('authorizationBussinesData');
        var auditSystem = localStorageService.get('auditSystemBussinesData');
        var pageCurrent = requestInit(config, authData);
        if (authData) {
            config.headers.Authorization = authData.token;
            config.headers['X-PAGE'] = pageCurrent;
            config.headers['X-SESSION'] = authData.Session;
        }
        if (auditSystem) {
            config.headers['X-ISTRACE'] = auditSystem.IsTrace;
        }
        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            var authService = $injector.get('authService');
            var authData = localStorageService.get('authorizationBussinesData');

            if (authData) {
                //TODO: serar el redireccinamiento de acceso de los erroes.
                $location.path('/Unauthorized');
                return $q.reject(rejection);
            }
            authService.logOut();
            document.location.href = "../Auth/index.html";
        }
        return $q.reject(rejection);
    }

    function requestInit(config, authData) {
        var pageCurrent = config.url.substring(config.url.indexOf('/') + 1, config.url.length - 5);

        if (config.url.indexOf('.html') > 0 && pageCurrent != 'Unauthorized') {
            localStorageService.set('pageAction' + authData.Session, { pageaction: pageCurrent });
        }
        var page = localStorageService.get('pageAction' + authData.Session);
        if (page) {
            pageCurrent = page.pageaction;
        }

        return pageCurrent;
    }



    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;
    authInterceptorServiceFactory.path = $location.path();
    return authInterceptorServiceFactory;
}]);