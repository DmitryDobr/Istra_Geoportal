import '../_src/styles/style.css';
import '../_src/styles/mapstyle.css';

import {View} from 'ol';
import {Map as OLMap} from 'ol';
import {ScaleLine, defaults as defaultControls} from 'ol/control.js';

import loadLayers from '../_src/scripts/loadLayer';
import loadTileLayers from '../_src/scripts/loadTile';
import initLayerControlGroup from '../_src/scripts/addControlGroup';

import JSONDataHeat from './layers_water.json'


function initMap() {
  var map = new OLMap({
    controls: defaultControls().extend([
      new ScaleLine({
        units: 'metric',
        bar: false,
      })
    ]),
    target: 'map',
    view: new View({
      center: [4103032, 7541596],
      zoom: 13,
      extent: [4085209.3395734723,7532196.019379589,4119531.700869216,7547897.008078464]
    })
  });

  var layers1 = loadTileLayers()
  for (var l of layers1) {map.addLayer(l[1])}
  initLayerControlGroup("Картографическая основа", layers1)

  var layers = loadLayers(JSONDataHeat); // zagruzka sloev karti teplosnabzenia
  for (var l of layers) {map.addLayer(l[1])}
  initLayerControlGroup("Схема водоснабжения г.Истра", layers)
}

initMap();


function LayerControlBoxVChange() {
  var x = document.getElementById("LayerControlBox");
  // console.log(x)
  if (x.style.display === "none") {
      x.style.display = "block";
  } else {
      x.style.display = "none";
  }

  x = document.getElementById("MapNavigation");
  x.style.display = "none";
}
document.getElementById("ControlButton").addEventListener("click", LayerControlBoxVChange);

function MapNavigationVChange() {
  var x = document.getElementById("MapNavigation");
  // console.log(x)
  if (x.style.display === "none") {
      x.style.display = "block";
  } else {
      x.style.display = "none";
  }

  x = document.getElementById("LayerControlBox");
  x.style.display = "none";
}
document.getElementById("menuButton").addEventListener("click", MapNavigationVChange);