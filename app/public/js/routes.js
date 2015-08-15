angular.module('coolquest').config(function($routeProvider){
    $routeProvider.when('/',
        { templateUrl: 'templates/home.html',
          controller: 'IndexController'
        });
    $routeProvider.when('/users',
        { templateUrl: 'templates/users/show.html',
            controller: 'UserShowController'
        });
    $routeProvider.when('/users/create',
        { templateUrl: 'templates/users/create.html',
            controller: 'UserCreateController'
        });
    $routeProvider.when('/user/:id',
        { templateUrl: 'templates/users/detail.html',
            controller: 'UserDetailController'
        });
    $routeProvider.when('/user/edit/:id',
        {   templateUrl: 'templates/users/edit.html',
            controller: 'UserEditController'
        });
    $routeProvider.when('/categorias',
        { templateUrl: 'templates/categorias/show.html',
            controller: 'CategoriaShowController'
        });
    $routeProvider.when('/categorias/create',
        { templateUrl: 'templates/categorias/create.html',
            controller: 'CategoriaCreateController'
        });
    $routeProvider.when('/categoria/:id',
        { templateUrl: 'templates/categorias/detail.html',
            controller: 'CategoriaDetailController'
        });
    $routeProvider.when('/categoria/edit/:id',
        {   templateUrl: 'templates/categorias/edit.html',
            controller: 'CategoriaEditController'
        });
});
