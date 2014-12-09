;(function(){
  'use strict';
  angular.module("myApp", ['ngRoute', 'mgcrea.ngStrap'])
  .config(function($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: 'views/table.html',
      controller: 'ContactsController',
      controllerAs: 'modify'
    })
    .when('/new', {
      templateUrl: 'views/form.html',
      controller: 'ContactsController',
      controllerAs: 'modify'
    })
    .when('/:id', {
      templateUrl: 'views/show.html',
      controller: 'ShowController',
      controllerAs: 'showCtrl'
    })
    .when('/:id/edit', {
      templateUrl: 'views/form.html',
      controller: 'EditController',
      controllerAs: 'modify'
    })
    .otherwise({redirectTo: '/'});
  })
  .controller('ShowController', function($http, $routeParams){
    var vm = this;
    var id= $routeParams.id;
    $http.get('https://geraldaddressbook.firebaseio.com/contacts/'+id+'.json')
    .success(function(data){
      vm.contact = data;
    })
    .error(function(err){
      console.log(err)
    });
  })
  .controller('EditController', function($http, $routeParams, $location){
    var vm = this;
    var id= $routeParams.id;
    var url= 'https://geraldaddressbook.firebaseio.com/contacts/'+id+'.json';
    $http.get(url)
    .success(function(data){
      vm.newContact = data;
    })
    .error(function(err){
      console.log(err)
    });
    vm.addNewContact = function(){
      $http.put(url, vm.newContact)
      .success(function(data){
        $location.path('/');
      })
      .error(function(err){
        console.log(err)
      });
    };
  })
  .controller('ContactsController', function($http){
    var vm = this;

    $http.get('https://geraldaddressbook.firebaseio.com/contacts.json')
    .success(function(data){
      vm.contacts = data;
    })
    .error(function(err){
      console.log(err);
    });

    vm.addNewContact = function(){
      $http.post('https://geraldaddressbook.firebaseio.com/contacts.json', vm.newContact)
      .success(function(data){
        vm.contacts[data.name] = vm.newContact;
        vm.newContact = freshContact();
      })
      .error(function(err){
        console.log(err);
      });
    };

    vm.removeContact = function(contactId){
      var url = 'https://geraldaddressbook.firebaseio.com/contacts/' + contactId + '.json';
      $http.delete(url)
      .success(function(data){
        delete vm.contacts[contactId];
      })
      .error(function(err){
        console.log(err);
      });
    };

    vm.newContact = freshContact();

    function freshContact(){
      return {
        name: ''
      };
    }
  });
})();
