'use strict';
angular.module('App.SettingServices', [])
.service('Setting', function () {
    return {
        getNotificationsHubUri: function() {
            return "https://WebApiPostulate.azurewebsites.net/notificationhub";
            //return "http://localhost/Inventory.FinanControl.Api/notificationhub";
        }
    };
});