define([
  '../../../app',
  '../../../services/studentGetResource'
], function(controllers) {
  controllers.controller('tecManagementCtrl', tecManagementFn);
  tecManagementFn.$inject = ['$timeout', '$q', 'getInfoService'];

  function tecManagementFn($timeout, $q, getInfoService) {
    var self = this;
    self.querySearch = querySearch;
    self.allContacts = loadContacts();
    self.contacts = [self.allContacts[0]];
    self.filterSelected = true;
    self.tecData = getInfoService.query({
      dataName: 'teacherdata'
    });

    function querySearch(query) {
      var results = query ?
        self.allContacts.filter(createFilterFor(query)) : [];
      return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(contact) {
        return (contact._lowername.indexOf(lowercaseQuery) != -1);;
      };

    }

    function loadContacts() {
      var contacts = [
        "软件工程1班",
        "软件工程2班",
        "软件工程3班",
        "软件工程4班",
        "数字与媒体1班",
        "数字与媒体2班",
        "数字与媒体3班",
        "数字与媒体4班"
      ];

      return contacts.map(function(c, index) {
        // var cParts = c.split(' ');
        var contact = {
          name: c,
          image: 'images/admin/iconfont-member.png',
          email: ''
        };
        contact._lowername = contact.name.toLowerCase();
        return contact;
      });
    }
  }
});