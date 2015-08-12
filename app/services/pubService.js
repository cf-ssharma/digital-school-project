define( [ '../app' ] , function ( services ) {
    // RESOURCE
  'use strict';
  services.factory('pubService', pubServiceFn);
  pubServiceFn.$injector = ['$resource'];
  function pubServiceFn($resource) {
    return $resource('/Digital_School/pub/:oparation', {}, {
      getNews: {method:'GET', params:{oparation:'GetNews'}}     
    });
  };
} );
