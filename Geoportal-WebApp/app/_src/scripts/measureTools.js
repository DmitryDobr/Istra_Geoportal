import {Feature} from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { LineString, Point, Polygon } from 'ol/geom';

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

let coords = [[]] // координаты измеряемого полигона
let MeasurePolygon = new Polygon([coords])
var polyvectorSource = new VectorSource({features: [new Feature(MeasurePolygon)], wrapX: false}) // слой с линией измерения
export var polyMeasureLayer = new VectorLayer({
  source: polyvectorSource,
  visible: false,
})

var MeasureRes = 0 // результат измерения
let tool = 1 // 1 - длина, 2 - площадь

export function measuretool(event) {

  let len = ""

  var thing = new Point(event.coordinate)
  // MeasureLine
  coords[0].push(event.coordinate)
  MeasurePolygon.setCoordinates(coords)

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

  if (tool == 1)
  {
    resultElem.innerHTML = MeasureRes.toFixed(3) + " м";
  }
  else
  {
    resultElem.innerHTML = MeasurePolygon.getArea().toFixed(3) + " м2";
  }
}
export function measureClear() {
  table.innerHTML = ""
  resultElem.innerHTML = ""
  PointVectorSource.clear()
  linevectorSource.clear()

  coords[0] = []
  MeasurePolygon.setCoordinates(coords)

  MeasureRes = 0
  prevPoint = null
}

document.getElementById("MeasureClear").addEventListener("click", measureClear);


// переключение между линейкой и планиметром
document.getElementById("LinearControlButton").onclick = () => {
  document.getElementById("measureinfo").innerHTML = "Линейка"
  document.getElementById("measureType").innerHTML = "Всего [Длина]"

  lineMeasureLayer.setVisible(true)
  polyMeasureLayer.setVisible(false)

  tool = 1
  resultElem.innerHTML = MeasureRes.toFixed(3) + " м";
}
document.getElementById("AreaControlButton").onclick = () => {
  document.getElementById("measureinfo").innerHTML = "Планиметр"
  document.getElementById("measureType").innerHTML = "Всего [Площадь]"
  lineMeasureLayer.setVisible(false)
  polyMeasureLayer.setVisible(true)

  tool = 2
  resultElem.innerHTML = MeasurePolygon.getArea().toFixed(3) + " м2";
}