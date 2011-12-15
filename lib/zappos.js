var path = require('path')
  , qs = require('querystring')
  , _ = require('underscore')
  , request = require('request');

var Zappos = module.exports = function(key) {
  this.base = 'http://api.zappos.com';
  this.key = key;
}

Zappos.prototype.getProduct = function(id, includes, params, callback) {
  var self = this;

  if (_.isFunction(includes)) {
    callback = includes;
    includes = null;
    params = null;
  } else if (_.isFunction(params)) {
    callback = params;
    params = null;
  }

  params = params || {};

  if (!_.isArray(id)) {
    id = [id];
  }

  id.forEach(function(e, i) { id[i] += ''; });
  params.id = JSON.stringify(id);

  if (includes) {
    if (!_.isArray(includes)) {
      includes = [includes];
    }
    params.includes = JSON.stringify(includes);
  }

  self.get('/Product', params, function(e, res) {
    callback(e, (res && res.product) ? res.product : null);
  });
}

Zappos.prototype.get = function(route, params, callback) {
  var self = this;

  params.key = self.key;

  request.get({
      uri: self.base + route + '?' + qs.stringify(params)
    , json: true
  }, function(e, r, data) {
    if (e) {
      return callback(e);
    }

    callback(null, data);
  }); 
}
