;(function(){
  'use strict';
  angular.module("myApp", [])
  .controller('ContactsController', function($http){
    var vm = this;

    $http.get('https://geraldaddressbook.firebaseio.com/contacts.json')
    .success(function(data){
      vm.contacts = data;
    });

    vm.addNewContact = function(){
      vm.contacts.push(vm.newContact);
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
