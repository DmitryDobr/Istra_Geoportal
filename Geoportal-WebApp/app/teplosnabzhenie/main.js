import '../_src/styles/style.css';
import '../_src/styles/mapstyle.css';

import {View} from 'ol';
import {Map as OLMap} from 'ol';
import {ScaleLine, defaults as defaultControls} from 'ol/control.js';

import loadLayers from './scripts/loadLayer';
import loadTileLayers from './scripts/loadTile';

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

  var layers1 = loadTileLayers()
  for (var l of layers1) {map.addLayer(l[1])}
  initLayerControlGroup("Картографическая основа", layers1)
  // sloi
  var layers = loadLayers(); // zagruzka sloev karti teplosnabzenia
  for (var l of layers) {map.addLayer(l[1])}
  initLayerControlGroup("Схема теплоснабжения г.Истра", layers)
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