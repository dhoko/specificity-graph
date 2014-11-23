'use strict';

function create(config, opts) {

  var headers = ['Selectors','Specificity','Average'];

  var stats = [headers];

  config.data.forEach(function (item) {
    stats.push([
      'Line:' + item.line + ' ' + item.selectors,
      parseInt(item.specificity, 10),
      parseFloat(item.average)
    ]);
  });

  window.stats = stats;
  google.load("visualization", "1", {packages:["corechart"]});
  google.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable(stats);

    var options = {
      title: 'CSS Specificity',
       hAxis: { textPosition: 'none' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);
  }
  drawChart();
}

module.exports = {
  create: create
}