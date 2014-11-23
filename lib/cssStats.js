'use strict';

var _ = require('lodash');
var colors = require('cli-color');

function cssStats(stats) {

  function filterBySpecificity(input, specificity) {
    return _.filter(input, function (item) {
      return item.specificity > specificity;
    });
  }

  function ratio(input) {
    return (input.length / stats.length) * 100;
  }

  var data = {
    selectors: [],
    max: _.max(stats,'specificity').specificity,
    min: _.min(stats,'specificity').specificity,
    avg: 0,
    analytics: {
      sup10: 0,
      sup20: 0,
      sup50: 0,
      sup100: 0,
      sup200: 0,
      sup1000: 0,
      overLim: 0
    }
  }

  var avg = _.pluck(stats,'specificity').reduce(function (a, b) {return a + b;}) / stats.length;
  data.avg = avg;


  console.log('Max specificity found: ' + data.max);

  if(data.max > 25) {

    var selectors = filterBySpecificity(stats,25);
    var sup10Selectors = filterBySpecificity(selectors, 10);
    var sup20Selectors = filterBySpecificity(sup10Selectors, 20);
    var sup50Selectors = filterBySpecificity(sup20Selectors, 50);
    var sup100Selectors = filterBySpecificity(sup50Selectors, 100);
    var sup200Selectors = filterBySpecificity(sup100Selectors, 200);
    var sup100Selectors = filterBySpecificity(sup200Selectors, 1000);


    data.analytics.sup10     = ratio(sup10Selectors);
    data.analytics.sup20     = ratio(sup20Selectors);
    data.analytics.sup50     = ratio(sup50Selectors);
    data.analytics.sup100    = ratio(sup100Selectors);
    data.analytics.sup200    = ratio(sup200Selectors);
    data.analytics.sup1000   = ratio(sup100Selectors);
    data.analytics.overLimit = ratio(data.selectors);

    data.selectors = _.sortBy(selectors, 'specificity');

    data.selectors.forEach(function (item) {
      console.log('— Line ' + colors.red(item.line) + ': ' + item.selectors);
    });
  }

  return data;

};

module.exports = cssStats;