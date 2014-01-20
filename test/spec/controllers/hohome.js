'use strict';

describe('Controller: HohomeCtrl', function () {

  // load the controller's module
  beforeEach(module('triMenuApp'));

  var HohomeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HohomeCtrl = $controller('HohomeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
