'use strict';

describe('Controller: BorderRadiusCtrl', function () {

  // load the controller's module
  beforeEach(module('triMenuApp'));

  var BorderRadiusCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BorderRadiusCtrl = $controller('BorderRadiusCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
