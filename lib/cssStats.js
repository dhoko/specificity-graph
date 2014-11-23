'use strict';

var _ = require('lodash');
var colors = require('cli-color');

/**
 * Compute some stats about a stylesheet
 * @param  {Array} stats Compute specificity per selector
 * @return {Object}
 */
function cssStats(stats) {

  /**
   * Filter an array by a specific specificity
   * @param  {Array} input       Array to filter
   * @param  {Number} specificity Specificity
   * @return {Array}
   */
  function filterBySpecificity(input, specificity) {
    return _.filter(input, function (item) {
      return item.specificity >= specificity;
    });
  }

  /**
   * Compute % of selectors from the default one
   * @param  {Array} input New array of selector
   * @return {Float}
   */
  function ratio(input) {
    return (input.length / stats.length) * 100;
  }

  var data = {
    selectors: stats.length,
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
      overLimit: 0
    }
  };

  var avg = _.pluck(stats,'specificity').reduce(function (a, b) {return a + b;}) / stats.length;
  data.avg = avg;

  data.hasError = data.max > 25;

  // If specificity is from hell
  if(data.max > 25) {

    var selectors        = filterBySpecificity(stats,25);
    var sup10Selectors   = filterBySpecificity(selectors, 10);
    var sup20Selectors   = filterBySpecificity(sup10Selectors, 20);
    var sup50Selectors   = filterBySpecificity(sup20Selectors, 50);
    var sup100Selectors  = filterBySpecificity(sup50Selectors, 100);
    var sup200Selectors  = filterBySpecificity(sup100Selectors, 200);
    var sup1000Selectors = filterBySpecificity(sup200Selectors, 1000);


    data.analytics.overLimit = ratio(selectors);
    data.analytics.sup10     = ratio(sup10Selectors);
    data.analytics.sup20     = ratio(sup20Selectors);
    data.analytics.sup50     = ratio(sup50Selectors);
    data.analytics.sup100    = ratio(sup100Selectors);
    data.analytics.sup200    = ratio(sup200Selectors);
    data.analytics.sup1000   = ratio(sup1000Selectors);
  }

  data.data = stats.map(function (item) {
    item.average = data.avg.toFixed(2);
    return item;
  })

  return data;

};

module.exports = cssStats;
