'use strict';


myAppControllers.controller('ProjectEditCtrl', ['$scope', 'projectList', 'dataSVC', function ($scope, projectList, dataSVC) {
    console.log('hi from the project edit controller!');

    $scope.projects = projectList;



}]);
