'use strict';

/**
 * @ngdoc function
 * @name otaniemi3dApp.controller:twoDViewCtrl
 * @description
 * # twoDViewCtrl
 * Controller of the otaniemi3dApp
 */
angular.module('otaniemi3dApp')
  .controller('twodview', function ($scope) {

    $scope.floorplans = [];

    $scope.addItem = function (planLink, planName) {
      $scope.floorplans.push({
        link: planLink,
        name: planName,
        svgElement: null
      });
    };

    //Add wanted floorplans to the list here
    $scope.addItem('/floorplans/Basement.svg', 'Basement');
    $scope.addItem('/floorplans/FloorPlan (1).svg', 'Floor 1');
    $scope.addItem('/floorplans/FloorPlan (2).svg', 'Floor 2');
    $scope.addItem('/floorplans/FloorPlan (3).svg', 'Floor 3');
    $scope.addItem('/floorplans/FloorPlan (4).svg', 'Floor 4');
    /////////////////////////////////////////

    var floorplanContainer = d3.select('.floorplan');

    $scope.selectPlan = function (selectedPlan) {
      d3.xml(selectedPlan.link, "image/svg+xml", function(xml) {

        if (selectedPlan.svgElement === null) {
          selectedPlan.svgElement = xml.documentElement;
        }

        floorplanContainer.node().innerHTML = '';
        floorplanContainer.node().appendChild(selectedPlan.svgElement);

        d3.select('svg').attr('pointer-events', 'all');

        /*
        *Some walls are rect elements, some are paths. Same applies to rooms.
        *This is why they must both be highlighted on mouseover.
        */
        d3.selectAll('rect')
          .on('mouseover', function () {
            d3.select(this).style('fill', 'red');
          })
          .on('mouseout', function () {
            d3.select(this).style('fill', null);
          });

        d3.selectAll('path')
          .on('mouseover', function () {
            d3.select(this).style('fill', 'red');
          })
          .on('mouseout', function () {
            d3.select(this).style('fill', null);
          });
        
        //Configures the moving and zooming behavior.
        function zoomHandler() {
          d3.select(this).attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
        }  
        
        var zoomListener = d3.behavior.zoom()
          .scaleExtent([1, 10])
          .on('zoom', zoomHandler);

        d3.select('g').call(zoomListener);

      });
    };
  });

