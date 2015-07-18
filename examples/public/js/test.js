var Module = (function () {

  console.log('module access');

  var _privateMethod = function () {
    console.log('private method');
  };

  var publicMethods = {
    someMethod:     function () {
      console.log('some method');
    },
    anotherMethod:  function () {
      console.log('another method');
    },
    callPrivate:    function() {
      _privateMethod();
    }
  };

  return publicMethods;

})();


var myModule = new Module();

Module.someMethod();
Module.anotherMethod();
Module.callPrivate();
