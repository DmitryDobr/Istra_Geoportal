import '../_src/styles/style.css';
import '../_src/styles/mapstyle.css';

import {View} from 'ol';
import {Map as OLMap} from 'ol';
import {ScaleLine, defaults as defaultControls} from 'ol/control.js';
import Overlay from 'ol/Overlay.js';

import loadLayers from '../_src/scripts/loadLayer';
import loadTileLayers from '../_src/scripts/loadTile';
import initLayerControlGroup from '../_src/scripts/addControlGroup';


import JSONDataHeat from './layers_heat.json'

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON.js';

var map = null
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});
function closeOverlay()  {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
}
closer.onclick = closeOverlay


function showInfo(event) {
  
  const features = map.getFeaturesAtPixel(event.pixel);

  if (features.length == 0) {
    closeOverlay()
    return;
  }
  else
  {
    const properties = features[0].getProperties();

    let featureInfo = properties
    delete featureInfo.geometry


    const coordinate = event.coordinate;
    const hdms = JSON.stringify(featureInfo);

    content.innerHTML = '<p>Информация об объкете:</p><code>' + hdms + '</code>';
    overlay.setPosition(coordinate);
  }
}

function initMap() {
  map = new OLMap({
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
    }),
    overlays: [overlay]
  });

  map.on('singleclick', showInfo);
  map.on('movestart', closeOverlay);

  var layers1 = loadTileLayers()
  for (var l of layers1) {map.addLayer(l[1])}
  initLayerControlGroup("Картографическая основа", layers1)

  // var layers = loadLayers(JSONDataHeat); // zagruzka sloev karti teplosnabzenia
  // for (var l of layers) {map.addLayer(l[1])}
  // initLayerControlGroup("Схема теплоснабжения г.Истра", layers)


  let str = 'my_workSpace_1:kotelni_zones'
  let strW = 1

  var layer = new VectorLayer({
    source: new VectorSource({
      url: 'http://127.0.0.1:8080/geoserver/my_workSpace_1/ows?service=WFS&version=1.0.0&' + 
      'request=GetFeature&typeName='+str+'&maxFeatures=50&outputFormat=application/json',
      format: new GeoJSON(),
      attributions: '@geoserver',
    }),
    style: {
      'stroke-width': strW,
      'stroke-color': 'red',
      'fill-color': 'rgba(100,100,100,0.0)',
    }
  })

  map.addLayer(layer)
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