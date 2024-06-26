import ImageWMS from 'ol/source/ImageWMS.js';
import {Image as ImageLayer} from 'ol/layer.js';


const loadLayers = (JSONDataSet) => {
    var totalLayers = new Map();
    // console.log(totalLayers)

    for (let JSONobj of JSONDataSet) {

        var layerName = JSONobj.name;
        var layerAddr = JSONobj.addr;

        if (layerName === null || layerAddr === null)
        {
            return
        }

        // opredelenie sloa
        let basemap = new ImageLayer({
            // extent: [4095511.4515792714, 7536156.42285326, 4110170.932075787, 7547609.141991164],
            source: new ImageWMS({
                url: 'http://127.0.0.1:8080/geoserver/my_workSpace_1/wms',
                params: {
                    'SERVICE' : 'WMS',
                    'VERSION' : '1.1.1',
                    'REQUEST' : 'GetMap',
                    'FORMAT' : 'image/png',
                    'TRANSPARENT' : 'true',
                    'LAYERS': layerAddr,
                    'exceptions' : 'application/vnd.ogc.se_inimage',
                    'SRS':'EPSG:3857',
                    'WIDTH' : '768',
                    'HEIGHT' : '601',
                    'BBOX' : '4095511.4515792714,7536156.42285326,4110170.932075787,7547609.141991164',
                },
                ratio: 1,
                serverType: 'geoserver',
            })
        });

        totalLayers.set(layerName, basemap)
    }

    return totalLayers;
}

export default loadLayers;