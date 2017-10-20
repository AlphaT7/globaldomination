
var c = function (d) {
    console.log(d);
};
google.charts.setOnLoadCallback(drawVisualization);
/*
function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
        ['Country', 'Popularity'],
        ['Germany', 200],
        ['United States', 300],
        ['Brazil', 400],
        ['Canada', 500],
        ['France', 600],
        ['RU', 700]
    ]);

    var options = {};

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
}
*/
/*
google.load('visualization', '1', { 'packages': ['geochart'] });
google.setOnLoadCallback(drawVisualization);
*/
var data,
   options,
   chart;

function drawVisualization() {
   data = new google.visualization.DataTable();
   data.addColumn('string', 'Country');
   data.addColumn('number', 'Value');
   data.addColumn({ type: 'string', role: 'tooltip' });
   var ivalue = new Array();

   data.addRows([
      [{ v: 'US-AK', f: 'Alaska' }, 0, 'Neautral']
   ]);
   ivalue['US-AK'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-AL', f: 'Alabama' }, 1, 'Neutral']
   ]);
   ivalue['US-AL'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-AR', f: 'Arkansas' }, 2, 'Neutral']
   ]);
   ivalue['US-AR'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-AZ', f: 'Arizona' }, 3, 'Neutral']
   ]);
   ivalue['US-AZ'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-CA', f: 'California' }, 4, 'Neutral']
   ]);
   ivalue['US-CA'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-CO', f: 'Colorado' }, 5, 'Neutral']
   ]);
   ivalue['US-CO'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-CT', f: 'Connecticut' }, 6, 'Neutral']
   ]);
   ivalue['US-CT'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-DE', f: 'Delaware' }, 7, 'Neutral']
   ]);
   ivalue['US-DE'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-FL', f: 'Florida' }, 8, 'Neutral']
   ]);
   ivalue['US-FL'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-GA', f: 'Georgia' }, 9, 'Neutral']
   ]);
   ivalue['US-GA'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-HI', f: 'Hawaii' }, 10, 'Neutral']
   ]);
   ivalue['US-HI'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-IA', f: 'Iowa' }, 11, 'Neutral']
   ]);
   ivalue['US-IA'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-ID', f: 'Idaho' }, 12, 'Neutral']
   ]);
   ivalue['US-ID'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-IL', f: 'Illinois' }, 13, 'Neutral']
   ]);
   ivalue['US-IL'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-IN', f: 'Indiana' }, 14, 'Neutral']
   ]);
   ivalue['US-IN'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-KS', f: 'Kansas' }, 15, 'Neutral']
   ]);
   ivalue['US-KS'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-KY', f: 'Kentucky' }, 16, 'Neutral']
   ]);
   ivalue['US-KY'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-LA', f: 'Louisiana' }, 17, 'Neutral']
   ]);
   ivalue['US-LA'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-MA', f: 'Massachusetts' }, 18, 'Neutral']
   ]);
   ivalue['US-MA'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-MD', f: 'Maryland' }, 19, 'Neutral']
   ]);
   ivalue['US-MD'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-ME', f: 'Maine' }, 20, 'Neutral']
   ]);
   ivalue['US-ME'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-MI', f: 'Michigan' }, 21, 'Neutral']
   ]);
   ivalue['US-MI'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-MN', f: 'Minnesota' }, 22, 'Neutral']
   ]);
   ivalue['US-MN'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-MO', f: 'Missouri' }, 23, 'Neutral']
   ]);
   ivalue['US-MO'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-MS', f: 'Mississippi' }, 24, 'Neutral']
   ]);
   ivalue['US-MS'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-MT', f: 'Montana' }, 25, 'Neutral']
   ]);
   ivalue['US-MT'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-NC', f: 'North Carolina' }, 26, 'Neutral']
   ]);
   ivalue['US-NC'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-ND', f: 'North Dakota' }, 27, 'Neutral']
   ]);
   ivalue['US-ND'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-NE', f: 'Nebraska' }, 28, 'Neutral']
   ]);
   ivalue['US-NE'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-NH', f: 'New Hampshire' }, 29, 'Neutral']
   ]);
   ivalue['US-NH'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-NJ', f: 'New Jersey' }, 30, 'Neutral']
   ]);
   ivalue['US-NJ'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-NM', f: 'New Mexico' }, 31, 'Neutral']
   ]);
   ivalue['US-NM'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-NV', f: 'Nevada' }, 32, 'Neutral']
   ]);
   ivalue['US-NV'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-NY', f: 'New York' }, 33, 'Neutral']
   ]);
   ivalue['US-NY'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-OH', f: 'Ohio' }, 34, 'Neutral']
   ]);
   ivalue['US-OH'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-OK', f: 'Oklahoma' }, 35, 'Neutral']
   ]);
   ivalue['US-OK'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-OR', f: 'Oregon' }, 36, 'Neutral']
   ]);
   ivalue['US-OR'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-PA', f: 'Pennsylvania' }, 37, 'Neutral']
   ]);
   ivalue['US-PA'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-RI', f: 'Rhode Island' }, 38, 'Neutral']
   ]);
   ivalue['US-RI'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-SC', f: 'South Carolina' }, 39, 'Neutral']
   ]);
   ivalue['US-SC'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-SD', f: 'South Dakota' }, 40, 'Neutral']
   ]);
   ivalue['US-SD'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-TN', f: 'Tennessee' }, 41, 'Neutral']
   ]);
   ivalue['US-TN'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-TX', f: 'Texas' }, 42, 'Neutral']
   ]);
   ivalue['US-TX'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-UT', f: 'Utah' }, 43, 'Neutral']
   ]);
   ivalue['US-UT'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-VA', f: 'Virginia' }, 44, 'Neutral']
   ]);
   ivalue['US-VA'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-VT', f: 'Vermont' }, 45, 'Neutral']
   ]);
   ivalue['US-VT'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-WA', f: 'Washington' }, 46, 'Neutral']
   ]);
   ivalue['US-WA'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-WI', f: 'Wisconsin' }, 47, 'Neutral']
   ]);
   ivalue['US-WI'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-WV', f: 'West Virginia' }, 48, 'Neutral']
   ]);
   ivalue['US-WV'] = 'This State is neutral.';

   data.addRows([
      [{ v: 'US-WY', f: 'Wyoming' }, 49, 'Neutral']
   ]);
   ivalue['US-WY'] = 'This State is neutral.';

   options = {
      //backgroundColor: {fill:'#fff', stroke:'#000', strokeWidth:'1' },
      colorAxis: { minValue: 0, maxValue: 49, colors: ['#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF', '#D2D7DF' ] },
      legend: { textStyle: { color: 'blue', fontSize: 16 } },
      //datalessRegionColor: '#f5f5f5',
      datalessRegionColor: '#fff',
      displayMode: 'regions',
      enableRegionInteractivity: 'true',
      resolution: 'provinces',
      sizeAxis: { minValue: 1, maxValue: 1, minSize: 10, maxSize: 10 },
      region: 'US',
      keepAspectRatio: true,
      width: 800,
      //height:400,
      tooltip: { textStyle: { color: '#444' }, trigger: 'hover' }
   };

   chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
   google.visualization.events.addListener(chart, 'select', function() {
      var selection = chart.getSelection();
      if (selection.length === 1) {
         var selectedRow = selection[0].row;
         var selectedRegion = data.getValue(selectedRow, 0);
         if (ivalue[selectedRegion] !== '') { clickHandler(ivalue[selectedRegion], selectedRow); }
      }
   });
   chart.draw(data, options);
}
 
function clickHandler(selectedstate, position) {
    c(selectedstate);
    c(position);
   data.setValue(0, 2, 'test');
   //alert(data.getValue(0,2));
   //options.colorAxis.colors[position] = '#806015';
   options.colorAxis.colors[position] = '#F2F3AE';
   options.colorAxis.colors.forEach(function (index) {
       if (index !== position) {
           options.colorAxis.colors[index] = 'blue';
       }
   });
   
   $('#regions_div path:nth-child(5'/* + position*/).css('stroke-width', '3');
   $('#regions_div path:nth-child(5'/* + position*/).css('stroke', '#6699cc');
   chart.draw(data, options);
   
}

function viewSettings() {
   $('#settings_bg').fadeIn('slow');
   $('#settings').fadeIn('fast');
}

$('#settings_bg').click(function() {
   closeSettings();
});

function closeSettings() {
   $('#settings_bg').fadeOut('fast');
   $('#settings').fadeOut('slow');
}


/*  --- Settings Buttons --- */
function settingsPanel(j) {
   for (var i = 1; i <= 5; i++) {
      if ('sb' + i !== j) {
         $('#sp' + i).css('display', 'none');
      } else {
         $('#sp' + i).css('display', 'block');
      }
   }
}

for (var i = 1; i <= 5; i++) { $('#sb' + i).click(function() { settingsPanel(this.id); }); }
