'use strict';


myAppControllers.controller('ProjectEditCtrl', ['$scope', '$routeParams', 'projectList', 'dataSVC', '_', function ($scope, $routeParams, projectList, dataSVC, _) {
    console.log('hi from the project edit controller! - id- ', $routeParams.id);

    $scope.projects = projectList;

    var projectId = $routeParams.id;

    console.log('hi from the project edit controller projects: ',$scope.projects);

    $scope.project = _.where($scope.projects, {id:projectId})[0];

}]);
