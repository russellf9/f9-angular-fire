'use strict';

myApp.factory('dataSVC', ['fbutil', 'projectList', function(fbutil, projectList) {
    var projects = projectList;
    return {
        addProject : function (name) {
            projects.$add({name: name}).then(function(ref) {
                // add the id as a `root`? property
                var id = ref.key();

                var index = projects.$indexFor(id); // returns location in the array
                console.log("added record with id " + id, ', has index ', index);


                var sync = fbutil.syncObjectReference(ref);
                sync.$set('id', id);
            });
        }
    };
}]);
