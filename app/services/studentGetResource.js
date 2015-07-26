define( [ '../app' ] , function ( services ) {
    // RESOURCE
  'use strict';
  services.factory('getInfoService', getInfoFn);
  getInfoFn.$inject = ['$resource'];
  function getInfoFn($resource) {
    return $resource('test/:dataName.json', {}, {
      query: {method:'GET', params:{dataName:'course'}, isArray:true}
    });
  };
} );


