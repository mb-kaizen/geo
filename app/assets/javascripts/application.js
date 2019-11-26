// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require d3
//= require mapbox.js
//= require jquery
//= require jquery_ujs
//= require_tree .

// Public Token
//  
$(document).ready( function(){

  var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  var svg = d3.select("body")
      .append("svg")
      .style("cursor", "move");

  svg.attr("viewBox", "50 10 " + width + " " + height)
      .attr("preserveAspectRatio", "xMinYMin");

  var zoom = d3.zoom()
      .on("zoom", function () {
          var transform = d3.zoomTransform(this);
          map.attr("transform", transform);
      });

  svg.call(zoom);

  var map = svg.append("g")
      .attr("class", "map");

  // var q = d3_queue.queue();

// TO REPLACE THE D3.QUEUE FUNCTION BEFORE 
// var files = ["data1.json", "data2.json", "data3.json"];
// var promises = [];

// files.forEach(function(url) {
//     promises.push(d3.json(url))
// });

// Promise.all(promises).then(function(values) {
//     console.log(values)
// });

  d3.queue()
      .defer(d3.json, "app/data/tokyo.json")
      // .defer(d3.json, "app/data/population.json")
      .await(function (error, world, data) {
          if (error) {
              console.error('Oh dear, something went wrong: ' + error);
          }
          else {
              drawMap(world, data);
          }
      });

  function drawMap(world, data) {
      // geoMercator projection
      var projection = d3.geoMercator() //d3.geoOrthographic()
          .scale(130)
          .translate([width / 2, height / 1.5]);

      // geoPath projection
      var path = d3.geoPath().projection(projection);

      //colors for population metrics
      var color = d3.scaleThreshold()
          .domain([10000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1500000000])
          .range(["#f7fcfd", "#e0ecf4", "#bfd3e6", "#9ebcda", "#8c96c6", "#8c6bb1", "#88419d", "#810f7c", "#4d004b"]);

      var features = topojson.feature(world, world.objects.countries).features;
      var populationById = {};

      data.forEach(function (d) {
          populationById[d.country] = {
              total: +d.total,
              females: +d.females,
              males: +d.males
          }
      });
      features.forEach(function (d) {
          d.details = populationById[d.properties.name] ? populationById[d.properties.name] : {};
      });

      map.append("g")
          .selectAll("path")
          .data(features)
          .enter().append("path")
          .attr("name", function (d) {
              return d.properties.name;
          })
          .attr("id", function (d) {
              return d.id;
          })
          .attr("d", path)
          .style("fill", function (d) {
              return d.details && d.details.total ? color(d.details.total) : undefined;
          })
          .on('mouseover', function (d) {
              d3.select(this)
                  .style("stroke", "white")
                  .style("stroke-width", 1)
                  .style("cursor", "pointer");

              d3.select(".country")
                  .text(d.properties.name);

              d3.select(".females")
                  .text(d.details && d.details.females && "Female " + d.details.females || "¯\\_(ツ)_/¯");

              d3.select(".males")
                  .text(d.details && d.details.males && "Male " + d.details.males || "¯\\_(ツ)_/¯");

              d3.select('.details')
                  .style('visibility', "visible")
          })
          .on('mouseout', function (d) {
              d3.select(this)
                  .style("stroke", null)
                  .style("stroke-width", 0.25);

              d3.select('.details')
                  .style('visibility', "hidden");
          });
}


  //////////////////////////////////////////////////////////////////////////////////////

  // mapboxgl.accessToken = 'pk.eyJ1IjoibWItbWFwYm94IiwiYSI6ImNrMzE0dWlkNTA1aHgzbWxidGIycTFyYnEifQ.tjVyoRPG6zh-KUfGSKrimQ';
  // var map = new mapboxgl.Map({
  //   style: 'mapbox://styles/mapbox/dark-v10',
  //   center: [-74.0066, 40.7135],
  //   zoom: 15.5,
  //   pitch: 45,
  //   bearing: -17.6,
  //   container: 'map',
  //   antialias: true
  // });

  // // The 'building' layer in the mapbox-streets vector source contains building-height
  // // data from OpenStreetMap.
  // map.on('load', function() {
  // // Insert the layer beneath any symbol layer.
  //   var layers = map.getStyle().layers;
     
  //   var labelLayerId;
  //   for (var i = 0; i < layers.length; i++) {
  //   if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
  //   labelLayerId = layers[i].id;
  //   break;
  //   }
  //   }
   
  //   map.addLayer({
  //   'id': '3d-buildings',
  //   'source': 'composite',
  //   'source-layer': 'building',
  //   'filter': ['==', 'extrude', 'true'],
  //   'type': 'fill-extrusion',
  //   'minzoom': 15,
  //   'paint': {
  //   'fill-extrusion-color': '#aaa',
     
  //   // use an 'interpolate' expression to add a smooth transition effect to the
  //   // buildings as the user zooms in
  //   'fill-extrusion-height': [
  //   "interpolate", ["linear"], ["zoom"],
  //   15, 0,
  //   15.05, ["get", "height"]
  //   ],
  //   'fill-extrusion-base': [
  //   "interpolate", ["linear"], ["zoom"],
  //   15, 0,
  //   15.05, ["get", "min_height"]
  //   ],
  //   'fill-extrusion-opacity': .6
  //   }
  //   }, labelLayerId);
  // });
});



///////////////////////////////////////////////////////////////////////////////////////
///
