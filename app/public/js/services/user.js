angular.module('coolquest').factory('User', function UserFactory($resource){
    return $resource('/api/:id', {}, {
        update: {
            method: 'PUT',
            url: '/user/:id'
        }
    });
});
