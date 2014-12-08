;(function(){
  'use strict';
  angular.module("myApp", [])
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
        getData();
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
