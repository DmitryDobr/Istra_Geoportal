import '../_src/styles/style.css';
import '../_src/styles/mapstyle.css';
import '../_src/styles/tablestyle.css';

import {View} from 'ol';
import {Map as OLMap} from 'ol';
import {ScaleLine, defaults as defaultControls} from 'ol/control.js';
import Overlay from 'ol/Overlay.js';

import {lineMeasureLayer, pointMeasureLayer, polyMeasureLayer, measuretool, measureClear} from '../_src/scripts/measureTools.js';

import loadTileLayers from '../_src/scripts/loadTile';
import initLayerControlGroup from '../_src/scripts/addControlGroup';
import loadVectorLayers from '../_src/scripts/loadVectorLayer';

import JSONDataHeat from './layers_heat.json'

var map = null
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

let mode = 2
// 1 - получение инфы об объектах на карте
// 2 - линейное измерение
// 3 - полигональное измерение

const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});
function closeOverlay() {
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
    let id_ = features[0].id_.split('.',1)

    let featureInfo = properties
    delete featureInfo.geometry

    const coordinate = event.coordinate;
    const hdms = JSON.stringify(featureInfo);
    let innerText = "<p>Идентификатор слоя: " + id_ + "</p>"
    innerText += "<p>Идентификатор объекта в слое: " + featureInfo.id + "</p>"
    innerText += "<p>Объект: " + featureInfo.name + "</p>"
    innerText += "<p>Город: " + featureInfo.city + "</p>"

    content.innerHTML = '<code>Информация об объекте</code><div style="font-size: 14px;">' + innerText + '</div>';
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

  map.on('singleclick', (event) =>{mode === 1 ? showInfo(event) : measuretool(event)});
  map.on('movestart', closeOverlay);

  var layers1 = loadTileLayers()
  for (var l of layers1) {map.addLayer(l[1])}
  initLayerControlGroup("Картографическая основа", layers1)

  var layers = loadVectorLayers(JSONDataHeat); // zagruzka sloev karti teplosnabzenia
  for (var l of layers) {map.addLayer(l[1])}
  initLayerControlGroup("Схема теплоснабжения г.Истра", layers)

  map.addLayer(lineMeasureLayer)
  map.addLayer(polyMeasureLayer)
  map.addLayer(pointMeasureLayer)
}
initMap();


// скрыть показать переключаемую "легенду"
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

// скрыть показать навигацию по сайту
function MapNavigationVChange() {
  var x = document.getElementById("MapNavigation");
  // console.log(x)
  if (x.style.display === "none") {
      x.style.display = "block";
      x = document.getElementById("LayerControlBox");
      x.style.display = "none";
  } else {
      x.style.display = "none";
  }
}
document.getElementById("menuButton").addEventListener("click", MapNavigationVChange);

// скрыть показать инструменты измерений
function MeasureControlBoxVChange() {
  var x = document.getElementById("measureButtonsBox");
  var y = document.getElementById("measureTableBox");
  // console.log(x)
  if (x.style.display === "none") {
      x.style.display = "";
      y.style.display = "";
      closeOverlay()
      mode = 2
  } else {
      x.style.display = "none";
      y.style.display = "none";
      measureClear()
      mode = 1
  }
}
document.getElementById("measureControlButton").addEventListener("click", MeasureControlBoxVChange);