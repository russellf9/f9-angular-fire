'use strict';

myApp.factory('dataSVC', ['$q', 'fbutil', 'projectList', '_', function ($q, fbutil, projectList, _) {
    var projects = projectList;
    return {
        addProject: function (name) {
            projects.$add({name: name}).then(function (ref) {
                // add the id as a `root`? property
                var id = ref.key();

                var index = projects.$indexFor(id); // returns location in the array
                console.log("added record with id " + id, ', has index ', index);

                var sync = fbutil.syncObjectReference(ref);
                sync.$set('id', id);
            });
        },
        getProject: function (projectId) {
            var deferred = $q.defer();
            projectList.$loaded().then(function(data) {
                projects = data;
                var project = _.where(projects, {id:projectId})[0];
                if (project) {
                    deferred.resolve(project);
                }
                // TODO -
                // reject(error);
            });
            return deferred.promise
        }
    };
}]);
