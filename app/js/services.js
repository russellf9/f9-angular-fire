(function() {
   'use strict';

   /* Services */

   angular.module('myApp.services', [])

      // put your services here!
      // .service('serviceName', ['dependency', function(dependency) {}]);

     .factory('messageList', ['fbutil', function(fbutil) {
       return fbutil.syncArray('messages', {limit: 10, endAt: null});
     }])

    .factory('projectList', ['fbutil', function(fbutil) {
        return fbutil.syncArray('projects', {limit: 10, endAt: null});
    }])
       // TODO is there a way of using a `single` project Service?
    .factory('project', ['fbutil', function(fbutil) {
        return fbutil.syncArray('projects', {limit: 10, endAt: null});
    }]);

})();

