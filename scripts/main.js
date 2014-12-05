;(function(){
  'use strict';
  var app = angular.module("myApp", []);

  app.controller('ContactsController', function(){
    var vm = this;
    vm.contacts = [
    {
      name: 'Leon Peck',
      phone: 8675309,
      address:  'Valhalla',
      email: 'l335@aol.com'
    }
    ];

    vm.newContact = function(){
      vm.contacts.push(vm.newContact);
    };

    vm.removeContact = function(){
      var index = vm.contacts.indexOf(contact);
      vim.contacts.splice(index, 1);
    };
  });
})();
