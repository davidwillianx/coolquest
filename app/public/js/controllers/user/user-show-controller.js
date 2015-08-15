angular.module('coolquest').controller('UserShowController', function($scope, User, $http){
    $http.get('/user').success(function(data){
        $scope.users = data;
    });

    $scope.destroy = function(user){
        if (confirm('Deseja realmente excluir este usuário?')){
            for (i = 0; i < $scope.users.length; i++){
                console.log($scope.users[i]);
                if ($scope.users[i]['id'] == user.id){
                    $scope.users.splice(i, 1);
                }
            }
            User.delete({id: user.id});
            alert('Cadastro removido com sucesso!');
        }
    }
});
