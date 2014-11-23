'use strict';

var generateCssData = require('./generateCssData');
var lineChart = require('./lineChart');

var _create = function(css, opts){
  var data = generateCssData(css);
  lineChart.create(data,opts);
}

var _update = function(css, opts){
  var data = generateCssData(css);
  lineChart.update(data);
}

var _draw = function(config, opts){
  lineChart.create(config,opts);
}

var _refresh = function(config){
  lineChart.update(config);
}

module.exports = {
  create: _create,
  update: _update,
  draw: _draw,
  refresh: _refresh,
  nextFocus: lineChart.nextFocus,
  prevFocus: lineChart.prevFocus
};
