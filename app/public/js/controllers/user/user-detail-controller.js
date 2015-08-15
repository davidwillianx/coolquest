angular.module('coolquest').controller('UserDetailController', function($scope, $resource, $routeParams, User){
    $scope.user = User.get({id: $routeParams.id});
});
