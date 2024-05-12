import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON.js';

import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import CircleStyle from 'ol/style/Circle';

var ip = "127.0.0.1"

const initStyle = (type, style) => {

    let newStyle = null

    switch (type) {
        case 'point' :
            newStyle = new Style({
                image: new CircleStyle({
                    fill: new Fill({
                        color: style.FillColor,
                    }),
                    stroke: new Stroke({
                        color: style.StrokeColor,
                        width: style.StrokeWidth,
                    }),
                    radius: style.Radius,
                }),
            })
        break
        case 'line' :
            newStyle = new Style({
                stroke: new Stroke({
                    color: style.StrokeColor,
                    width: style.StrokeWidth,
                }),
            })
        break
        case 'poly' :
            newStyle = new Style({
                stroke: new Stroke({
                    color: style.StrokeColor,
                    width: style.StrokeWidth,
                }),
                fill: new Fill({
                    color: style.FillColor,
                }),
            })
        break
    }

    return newStyle
}

const loadVectorLayers = (JSONDataSet) => {

    var totalLayers = new Map();

    for (let JSONobj of JSONDataSet) {

        let layerName = JSONobj.name
        let layer = null

        layer = new VectorLayer({
            source: new VectorSource({
                url: 'http://' + ip + ':8080/geoserver/my_workSpace_1/ows?service=WFS&version=1.0.0&' + 
                'request=GetFeature&typeName='+ JSONobj.addr +'&maxFeatures=50&outputFormat=application/json',
                format: new GeoJSON(),
                attributions: '@geoserver',
            }),
            style: initStyle(JSONobj.type, JSONobj.style)
        })
        
        totalLayers.set(layerName, layer)
    }

    return totalLayers;
}


export default loadVectorLayers;