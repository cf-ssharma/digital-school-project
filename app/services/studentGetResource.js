define( [ '../app' ] , function ( services ) {
    // RESOURCE
  'use strict';
  services.factory('getInfoService', getInfoFn);
  getInfoFn.$injector = ['$resource'];
  function getInfoFn($resource) {
    return $resource('test/:dataName.json', {}, {
      query: {method:'GET', params:{dataName:'course'}, isArray:true}
    });
  };
} );


