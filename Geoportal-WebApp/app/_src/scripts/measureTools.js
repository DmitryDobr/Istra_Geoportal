import {Feature} from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { LineString, Point } from 'ol/geom';

import {getLength} from 'ol/sphere';

const table = document.getElementById('measureTable');
const resultElem = document.getElementById('measureRes');

var prevPoint = null // предыдущая отмеченная точка

var PointVectorSource = new VectorSource() // слой с точками измерения
export var pointMeasureLayer = new VectorLayer({
  source: PointVectorSource
})

var linevectorSource = new VectorSource() // слой с линией измерения
export var lineMeasureLayer = new VectorLayer({
  source: linevectorSource
})

var MeasureRes = 0 // результат измерения

export function measuretool(event) {

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
export function measureClear() {
  table.innerHTML = ""
  resultElem.innerHTML = ""
  PointVectorSource.clear()
  linevectorSource.clear()
  MeasureRes = 0
  prevPoint = null
}

document.getElementById("MeasureClear").addEventListener("click", measureClear);

