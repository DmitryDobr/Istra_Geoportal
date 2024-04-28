import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ.js';
import OSM from 'ol/source/OSM';


const loadTileLayers = () => {

    // cartograficheskaya osnova
    var TileOSM = new TileLayer({
        source: new OSM()
    })
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
    

    return totalLayers;
}

export default loadTileLayers;