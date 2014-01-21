'use strict';

describe('Service: Rotationtest', function () {

  // load the service's module
  beforeEach(module('triMenuApp'));

  // instantiate service
  var Rotationtest;
  beforeEach(inject(function (_Rotationtest_) {
    Rotationtest = _Rotationtest_;
  }));

  it('should do something', function () {
    expect(!!Rotationtest).toBe(true);
  });

});
