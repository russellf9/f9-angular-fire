'use strict';

myApp.factory('dataSVC', ['$q', 'fbutil', 'projectList', '_', function ($q, fbutil, projectList, _) {
    var projects = projectList,
        currentProject,
        currentProjectRef;
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
            projectList.$loaded().then(function (data) {
                projects = data;
                var project = _.where(projects, {id: projectId})[0];

                currentProject = project;

                console.log('project: ', currentProject);
                if (project) {
                    deferred.resolve(project);
                }
                // TODO -
                // reject(error);
            });
            return deferred.promise
        },
        setName: function (projectId, newName) {
            console.log('We have project: ', currentProject.id);
            if (currentProject.id === projectId) {
                var currentProjectRef = fbutil.ref('projects/' + projectId);

                var currentProjectSync = fbutil.syncObjectReference(currentProjectRef);

                currentProjectSync.$set('name', newName);

                currentProjectSync.$update('days', {two: 'tuesday'});
            }
        }
    };
}]);
