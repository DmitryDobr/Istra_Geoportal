import '../_src/styles/style.css';
import '../_src/styles/mapstyle.css';
import '../_src/styles/tablestyle.css';

import {Feature, View} from 'ol';
import {Map as OLMap} from 'ol';
import {ScaleLine, defaults as defaultControls} from 'ol/control.js';
import Overlay from 'ol/Overlay.js';

// import loadLayers from '../_src/scripts/loadLayer';
import loadTileLayers from '../_src/scripts/loadTile';
import initLayerControlGroup from '../_src/scripts/addControlGroup';
import loadVectorLayers from '../_src/scripts/loadVectorLayer';

import JSONDataHeat from './layers_heat.json'

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { LineString, Point } from 'ol/geom';

import {getLength} from 'ol/sphere';

var map = null
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

const table = document.getElementById('measureTable');
const resultElem = document.getElementById('measureRes');

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

var prevPoint = null
var PointVectorSource = new VectorSource()
var pointMeasureLayer = new VectorLayer({
  source: PointVectorSource
})
var linevectorSource = new VectorSource()
var lineMeasureLayer = new VectorLayer({
  source: linevectorSource
})
var MeasureRes = 0

function measuretool(event) {

  let len = ""

  var thing = new Point(event.coordinate)

  if (prevPoint !== null)
  {
    var LineThing = new LineString([])
    LineThing.appendCoordinate(prevPoint)
    LineThing.appendCoordinate(event.coordinate)
    var linefeature = new Feature({
      name: "Thing",
      geometry: LineThing
    })

    linevectorSource.addFeature( linefeature );
    
    len = getLength(LineThing)
    MeasureRes += len
    len = len.toFixed(3)
  }

  var feature = new Feature({
    name: "Thing",
    geometry: thing
  })

  PointVectorSource.addFeature( feature );

  prevPoint = event.coordinate

  table.innerHTML += "<div>" + event.coordinate[0].toFixed(3) + "</div>" + 
  "<div>"+ event.coordinate[1].toFixed(3) +"</div>" + 
  "<div>"+ len +"</div>";

  resultElem.innerHTML = MeasureRes.toFixed(3) + " м";
}
function measureClear() {
  table.innerHTML = ""
  resultElem.innerHTML = ""
  PointVectorSource.clear()
  linevectorSource.clear()
  MeasureRes = 0
  prevPoint = null
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
  } else {
      x.style.display = "none";
  }

  x = document.getElementById("LayerControlBox");
  x.style.display = "none";
}
document.getElementById("menuButton").addEventListener("click", MapNavigationVChange);

// скрыть показать инструменты измерений
function MeasureControlBoxVChange() {
  var x = document.getElementById("measureButtonsBox");
  // console.log(x)
  if (x.style.display === "none") {
      x.style.display = "";
      mode = 2
  } else {
      x.style.display = "none";
      mode = 1
  }
  console.log(mode)
}
document.getElementById("measureControlButton").addEventListener("click", MeasureControlBoxVChange);

document.getElementById("MeasureClear").addEventListener("click", measureClear);