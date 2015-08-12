define( [ '../app' ] , function ( services ) {
    // RESOURCE
  'use strict';
  services.factory('stuService', stuServiceFn);
  stuServiceFn.$injector = ['$resource'];
  function stuServiceFn($resource) {
    return $resource('/Digital_School/stu/:oparation', {}, {
      getLessons: {method:'GET', params:{oparation:'GetAllLes'}}     
    });
  };
} );
