define( [ '../app' ] , function ( services ) {
    // RESOURCE
  'use strict';
  services.factory('adminService', adminServiceFn);
  adminServiceFn.$injector = ['$resource'];
  function adminServiceFn($resource) {
    return $resource('/Digital_School/adm/:oparation', {}, {
      updateNews: {method:'POST', params:{oparation:'AddNews'}}     
    });
  };
} );
