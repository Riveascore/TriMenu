'use strict';

describe('Controller: RotationtestCtrl', function () {

  // load the controller's module
  beforeEach(module('triMenuApp'));

  var RotationtestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RotationtestCtrl = $controller('RotationtestCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
