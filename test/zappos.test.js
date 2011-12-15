var key = require('../key')
  , Zappos = require('../')
  , zappos;

describe('Zappos', function() {
  before(function() {
    zappos = new Zappos(key);
  });

  describe('#getProduct()', function() {
    it('should return a product if the id is valid', function(done) {
      zappos.getProduct('7555745', done);
    });

    it('should return an error if the id is invalid', function(done) {
      done();
    });

  });
});
