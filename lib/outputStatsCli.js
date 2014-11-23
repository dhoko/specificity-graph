'use strict';

var Table = require('cli-table');

/**
 * Display a table of stats about the CSS such as:
 * - Max specificity
 * - Min specificity
 * - Avg specificity
 * - Total selectors
 * - Total selectors > limit
 * @param  {Object} data   Output from cssStats
 * @param  {Array} origin Parsed css per specificity
 * @return {void}
 */
function displayTable(data, origin) {
  var table = new Table({
    head: ['Average Specificity', 'Max Specificity','Min Specificity', 'Total selectors > limit', 'Total selectors']
  });
  table.push([data.avg.toFixed(2), data.max, data.min, data.selectors.length, origin.length]);
  console.log(table.toString());
}

/**
 * Display a table of analytics about the CSS such as:
 * - specificity >= Limit
 * - specificity >= 10
 * - specificity >= 20
 * - specificity >= 50
 * - specificity >= 100
 * - specificity >= 200
 * - specificity >= 1000
 * @param  {Object} data   Output from cssStats
 * @return {void}
 */
function displayAnalytics(data) {
  var table = new Table({
    head: ['Specificity', '>= Limit', '>= 10','>= 20', '>= 50', '>= 100', '>= 200', '>= 1000']
  });

  var stat = data.analytics;

  table.push([
    '#',
    stat.overLimit.toFixed(2),
    stat.sup10.toFixed(2),
    stat.sup20.toFixed(2),
    stat.sup50.toFixed(2),
    stat.sup100.toFixed(2),
    stat.sup200.toFixed(2),
    stat.sup1000.toFixed(2)
  ]);
  console.log(table.toString());
}

module.exports = {
  display: displayTable,
  analytics: displayAnalytics
};