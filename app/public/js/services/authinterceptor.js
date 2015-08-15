angular.module('coolquest').factory('authInterceptor', function AuthInterceptorFactory($rootScope, $q, $window, $location) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                $rootScope.logged = true;
            }else{
                if (!($window.sessionStorage.token) && ($location.path() != '/')){
                    alert("Você precisa estar logado!");
                    $window.location.href = '/#/';
                    $rootScope.logged = false;
                }
                $rootScope.logged = false;
            }
            return config;
        },
        response: function (response) {
            return response || $q.when(response);
        },
        responseError: function(response){
            if (response.status == 400){
                alert('Você precisa estar logado');
                $window.location.href = '/#/';
            }

            return response;
        }
    };
});

angular.module('coolquest').config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});
