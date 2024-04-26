import './style.css';
import {View} from 'ol';
import {Map as OLMap} from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ.js';
import OSM from 'ol/source/OSM';
import {ScaleLine, defaults as defaultControls} from 'ol/control.js';

import loadLayers from './scripts/loadLayer';

var map = null

// sozdanie gruppi v legendi interactivnoi
function initLayerControlGroup(groupName, layers) {
  // 0 - name
  // 1 - layer

  var x = document.getElementById("LayerControlBox");
  // x.innerHTML = "";

  let div1 = document.createElement('div');
  div1.innerHTML = groupName;
  div1.className = "LayerControlGroupName";
  // x.append(div1);

  let div2 = document.createElement('div');
  div2.className = "LayerControlGroup";

  for (var layer of layers)
  {
    let layerName = layer[0]
    let basemap = layer[1]

    let div = document.createElement('div');
    div.className = "LayerControlElem";

    let checkbox = document.createElement('input');
    checkbox.type ='checkbox'; 
    checkbox.checked = true;
    checkbox.className = "MapLayerCheckbox";

    div.append(checkbox);
    div.append(layerName);

    checkbox.addEventListener("click", () => {basemap.setVisible(!basemap.isVisible())});

    div2.prepend(div)
  }
  div2.prepend(div1)

  x.prepend(div2)
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
    // layers: [
      // new TileLayer({
      //   source: new OSM()
      // }),
    // ],
    view: new View({
      center: [4103032, 7541596],
      zoom: 13,
      extent: [4085209.3395734723,7532196.019379589,4119531.700869216,7547897.008078464]
    })
  });
  
  // cartograficheskaya osnova
  var TileOSM = new TileLayer({source: new OSM()})

  var TileESRI = new TileLayer({
    source: new XYZ({
      attributions:
        'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
        'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
      url:
        'https://server.arcgisonline.com/ArcGIS/rest/services/' +
        'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    }),
  })

  var totalLayers = new Map();
  totalLayers.set('ESRI', TileESRI);
  totalLayers.set('Open Street Map', TileOSM);
  for (var l of totalLayers) {map.addLayer(l[1])}
  initLayerControlGroup("Картографическая основа", totalLayers)

  // sloi
  var layers = loadLayers(); // zagruzka sloev karti teplosnabzenia
  // layers.set('OSM', TileOSM)
  console.log(layers)
  for (var l of layers) {map.addLayer(l[1])}
  initLayerControlGroup("Схема теплоснабжения г.Истра", layers)

}

initMap();


function myFunction() {
  var x = document.getElementById("LayerControlBox");
  console.log(x)
  if (x.style.display === "none") {
      x.style.display = "block";
  } else {
      x.style.display = "none";
  }
}
document.getElementById("ControlButton").addEventListener("click", myFunction);

