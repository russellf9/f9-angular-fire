'use strict';


myAppControllers.controller('ProjectCtrl', ['$scope', 'projectList', 'dataSVC', function ($scope, projectList, dataSVC) {
    console.log('hi from the project controller!');

    $scope.projects = projectList;

    console.log('hi from the project controller! projects: ', $scope.projects);

    $scope.addProject = function(name) {
        if (name) {
            //$scope.projects.$add({name: name});
            console.log('addProject: ',name);
            dataSVC.addProject(name);
        }
    };



}]);
