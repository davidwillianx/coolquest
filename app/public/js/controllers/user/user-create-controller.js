angular.module("coolquest").controller('UserCreateController',function($scope, $location, User){
    $scope.user = new User();

    $scope.save = function(user){
        user.$save(user);
        alert('Cadastro realizado com sucesso!');
        $location.path('/users');
    }




});
