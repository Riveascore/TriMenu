'use strict';

describe('Service: Br', function () {

  // load the service's module
  beforeEach(module('triMenuApp'));

  // instantiate service
  var Br;
  beforeEach(inject(function (_Br_) {
    Br = _Br_;
  }));

  it('should do something', function () {
    expect(!!Br).toBe(true);
  });

});
