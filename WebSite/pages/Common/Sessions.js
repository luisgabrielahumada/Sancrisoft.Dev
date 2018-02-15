'use strict';
App.controller('MenuCrtl', ['$http', '$scope', 'serviceRest', 'SignalrService', 'authService', 'localStorageService', 'Setting', function ($http, $scope, serviceRest, SignalrService, authService, localStorageService, Setting) {

    $scope.error = function (data) { $scope.ngNotify.set(data.Message,'error'); }
    var settingUri = {
        Uri: ""
    };
    $scope.countMessages = 0;
    $scope.countNotification = 0;
    $scope.itemMessages = [];
    $scope.itemNotification = [];
    SignalrService.initialize($scope, function (data) {
        switch (data.Code) {
            case "Messages":
                $scope.countMessages+=1;
                $scope.itemMessages.reverse();
                $scope.itemMessages.push(data);
                $scope.itemMessages.reverse();
                break;
            case "Notifications":
                $scope.ListNotifications();
                $scope.countNotification+=1;
                $scope.itemNotification.push({
                    id:data.Id,
                    message:data.Message,
                    date:data.Date,
                    status:data.Status
                });
                localStorageService.set('notificationServerNotificationData', JSON.stringify($scope.itemNotification));
                break;
        }
    }, Setting.getNotificationsHubUri());

    $scope.ListNotifications = function () {
        $scope.itemNotification = localStorageService.get('notificationServerNotificationData') || [];
    };
    $scope.initNotifications = function () {
        $scope.countNotification = 0;
    };
    $scope.clearNotifications = function () {
        $scope.itemNotification = [];
        localStorageService.remove('notificationServerNotificationData');
        $scope.notifygrowl.success("Clear all notifications! Ok", { title: 'Success!' });
    };
    $scope.Menu = function () {
        $http.get('../Settings.json').then(
           function (response) {
               var appSettings= response.data.Settings
               if (appSettings.appSettings.active === 'LOCAL') {
                   settingUri.Uri = appSettings.appUriLocal.value;
               }
               if (appSettings.appSettings.active === 'REMOTE') {
                   settingUri.Uri = appSettings.appUriRemote.value;
               }
               $scope.Rest.Get(settingUri.Uri, 'Menus/MenuOptionSession',
                                  function (response) {
                                      $scope.menus = response.data;
                                  }, $scope.error);

               console.log($scope.menus);
           }
       );
        $scope.authentication = authService.authentication;
    };

    $scope.Menu();

    $scope.ListNotifications();

    $scope.logOut = function () {
        var authData = localStorageService.get('authorizationBussinesData');
        if (authData) {
            $scope.Rest.Post($scope.Settings.Uri, 'Auth/SignOut/', authData.Session,
                    function (response) {
                    }, $scope.error);
        }
        authService.logOut();
        $scope.authentication = authService.authentication;
        document.location.href = "../Auth/index.html";
    }

    $scope.IsTrace = function (value) {
        if(value){
            localStorageService.set('auditSystemBussinesData', { isTrace: value});
        }
        if (!value) {
            localStorageService.remove('auditSystemBussinesData');
        }
    };
}]);