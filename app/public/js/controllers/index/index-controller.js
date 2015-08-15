angular.module('coolquest').controller('IndexController', function($scope, $http, $window, $location){

    $scope.email = '';
    $scope.senha = '';
    $scope.grant_type = 'password';
    $scope.logged = false;

    $scope.isLogged = function(){
        if (typeof $window.sessionStorage.token != 'undefined') {
            $scope.logged = true;
        }else{
            $scope.logged = false;
        }
    }

    $scope.isLogged();

    $scope.submit = function(){
        data = {username: $scope.email, password: $scope.senha, grant_type: 'password', client_id: 1, client_secret: 'beethoven'};
        $http.post('/api/authenticate', data).success(function(response){
            if (response.token){
                $window.sessionStorage.token = response.token;
                alert('Bem-vindo!');
            }else{
                alert(response.message);
            }
        });
    }
});
