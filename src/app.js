import "ol/ol.css";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import View from "ol/View";
import Overlay from "ol/Overlay";
import { fromLonLat } from "ol/proj";
import GPX from "ol/format/GPX";
import VectorSource from "ol/source/Vector";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { FullScreen, defaults as defaultControls } from "ol/control";
import { Stroke, Style } from "ol/style";
import { quiz1 } from "./icons/quiz1.js";
import { quiz2 } from "./icons/quiz2.js";
import { quiz3 } from "./icons/quiz3.js";
import { start } from "./icons/start.js";
import { meta } from "./icons/meta.js";
import { alert } from "./icons/alert.js";
import { popupMap } from "./popup.js";
import { track } from "./geolocation.js";

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM is ready.");
});
const popupElement = document.getElementById("popup");
const popup = new Overlay({
  element: popupElement,
  positioning: "bottom-center",
  stopEvent: true,
  offset: [0, -40]
});

const raster = new TileLayer({
  source: new OSM({
    attributions: ""
  })
});

const style = {
  MultiLineString: new Style({
    stroke: new Stroke({
      color: "#F037A5",
      width: 3
    })
  })
};
const vector = new VectorLayer({
  source: new VectorSource({
    url: "src/gpx/new.gpx",
    format: new GPX()
  }),
  style: function (feature) {
    return style[feature.getGeometry().getType()];
  }
});
const view = new View({
  center: fromLonLat([17.65, 52.35]),
  zoom: 13
});

/*GEOLOCATION*/
//const geo = document.getElementById("geo");
const geoLay = track(view);
/*********GEOLOCATIOn */
console.log(window.innerHeight);
const mMap = document.getElementById("map");
mMap.style.height = window.innerHeight * 0.7 + "px";

const map = new Map({
  controls: defaultControls().extend([new FullScreen()]),
  layers: [
    raster,
    vector,
    quiz1.vecLay,
    quiz2.vecLay,
    quiz3.vecLay,
    start.vecLay,
    meta.vecLay,
    alert.vecLay,
    geoLay
  ],
  overlays: [popup],
  target: "map",
  view: view
});

const iBtn = document.getElementById("iBtn");
console.log(iBtn);
iBtn.addEventListener("click", showAttributions);

function showAttributions() {
  const iTxt = document.getElementById("iTxt");
  iTxt.classList.toggle("hide");
}

popupMap(map, popup, popupElement);
