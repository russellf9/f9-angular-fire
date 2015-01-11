'use strict';


myAppControllers.controller('ProjectEditCtrl', ['$scope', '$routeParams', 'projectList', 'dataSVC', '_', function ($scope, $routeParams, projectList, dataSVC, _) {
    console.log('hi from the project edit controller! - id- ', $routeParams.id);

    console.log('projectList: ', projectList);

    var projectId = $routeParams.id;

    // use a $promise to get the unique project
    dataSVC.getProject(projectId).then(function(data){
        $scope.project = data;
        console.log('ok project: ',$scope.project );
    });

    $scope.setName = function(newName) {
        if (!$scope.project) {
            return;
        }
        dataSVC.setName(projectId, newName);

    };
}]);
