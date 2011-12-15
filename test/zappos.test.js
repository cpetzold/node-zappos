var key = require('../key')
  , Zappos = require('../')
  , zappos;

describe('Zappos', function() {
  before(function() {
    zappos = new Zappos(key);
  });

  describe('#getProduct()', function() {
    it('should return a product', function(done) {
      zappos.getProduct(10042176, done);
    });
  });
});
