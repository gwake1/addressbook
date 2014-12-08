;(function(){
  'use strict';
  angular.module("myApp", ['ngRoute'])
    .config(function($routeProvider){
      $routeProvider
      .when('/', {
        templateUrl: 'views/index.html'
      })
      .when('/new',{
        templateUrl: 'views/form.html'
      })
      .otherwise({
        redirectTo:'/'
      })
    })
  .controller('ContactsController', function($http){
    var vm = this;

    var getData = function(){$http.get('https://geraldaddressbook.firebaseio.com/contacts.json')
    .success(function(data){
      vm.contacts = data;
    })};

    getData();

    vm.addNewContact = function(){
      $http.post('https://geraldaddressbook.firebaseio.com/contacts.json', vm.newContact)
      .success(function(data){
        vm.contacts[data.name] = vm.newContact;
        vm.newContact = freshContact();
      });
    };

    vm.removeContact = function(contactId){
      var url = 'https://geraldaddressbook.firebaseio.com/contacts/' + contactId + '.json';
      console.log(contactId);
      $http.delete(url)
      .success(function(data){
        delete vm.contacts[contactId];
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
