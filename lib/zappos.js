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
    includes = {};
    params = {};
  } else if (_.isFunction(params)) {
    callback = params;
    params = {};
  }

  params = params || {};

  if (!_.isArray(id)) {
    id = JSON.stringify(includes);
  }

  if (!_.isArray(includes)) {
    includes = JSON.stringify(includes);
  }

  params.id = id;
  params.includes = includes;

  self.get('/Product', params, callback);
}

Zappos.prototype.get = function(route, params, callback) {
  var self = this;

  params.key = self.key;

  request.get({
      uri: self.base + route + '?' + qs.stringify(params)
    , json: true
  }, callback); 
}
