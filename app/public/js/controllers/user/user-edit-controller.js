angular.module('coolquest').controller('UserEditController', function($scope, $routeParams, $location, User){
    $scope.user = User.get({id: $routeParams.id});

    $scope.update = function(){
       User.update({id: $scope.user.id}, $scope.user);
       alert('Os dados foram alterados com sucesso!');
       $location.path('/users');
    };
});
