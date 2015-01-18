'use strict';

myApp.factory('dataSVC', ['$q', 'fbutil', 'projectList', '_', function($q, fbutil, projectList, _) {
    var projects = projectList,
        currentProject,
        currentProjectRef;
    return {
        addProject: function(name) {
            projects.$add({name: name, friends: ['-']}).then(function(ref) {
                // add the id as a `root`? property
                var id = ref.key(),
                    index = projects.$indexFor(id); // returns location in the array
                console.log('added record with id ' + id, ', has index ', index);

                var sync = fbutil.syncObjectReference(ref);
                sync.$set('id', id);
            });
        },
        getProject: function(projectId) {
            var deferred = $q.defer();
            projectList.$loaded().then(function(data) {
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
        setName: function(projectId, newName) {
            console.log('We have project: ', currentProject.id);
            if (currentProject.id === projectId) {
                var currentProjectRef = fbutil.ref('projects/' + projectId),
                    currentProjectSync = fbutil.syncObjectReference(currentProjectRef);

                currentProjectSync.$set('name', newName);

                currentProjectSync.$update('days', {two: 'tuesday'});
            }
        },
        addFriend: function(projectId, name) {
            console.log('\n*** addFriend: ', projectId, ' | Add friend: ', name);
            if (projects) {
                var projectFriendsRef = fbutil.ref('projects/' + projectId + '/friends'),
                    projectFriendsSync = fbutil.syncObjectReference(projectFriendsRef),
                    list = projectFriendsSync.$asArray();

                list.$loaded().then(function() {
                    list.$add({name: name}).then(function(result) {
                        console.log('list added ' + result);
                    }, function(error) {
                        console.log('Error:', error);
                    });
                });
            }
        },
        addItem: function(collecion, data, array, callback) {
            collecion.$add(data).then(function(result) {
                console.log('list added ' + result);
                callback(array);
            }, function(error) {
                console.log('Error:', error);
            });

        },
        /**
         * Adds a collection of friends
         * @param projectId
         * @param names
         */
        addFriends: function(projectId, names) {

            console.log('\n*** addFriends: ', projectId, ' | Add friends: ', names);

            var addFirstItem = function(array) {
                    var item = array.shift();
                    if (item) {
                        self.addItem(list, item, array, addFirstItem);
                    }
                },

                self = this;

            if (projects) {
                var projectFriendsRef = fbutil.ref('projects/' + projectId + '/friends'),
                    projectFriendsSync = fbutil.syncObjectReference(projectFriendsRef),
                    list = projectFriendsSync.$asArray();

                list.$loaded().then(function() {
                    addFirstItem(names);
                });
            }
        },
        removeFriend: function(projectId, index) {

            console.log('remove friend')
            var projectFriendsRef = fbutil.ref('projects/' + projectId + '/friends'),
                projectFriendsSync = fbutil.syncObjectReference(projectFriendsRef),
                list = projectFriendsSync.$asArray();
            list.$loaded().then(function() {
                list.$remove(index).then(function(result) {
                    console.log('item removed from list: ' + result);
                });
            });

        }
    };
}]);
