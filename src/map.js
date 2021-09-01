import "ol/ol.css";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import { Tile as TileLayer } from "ol/layer";
import { FullScreen, defaults as defaultControls } from "ol/control";
import { quiz1 } from "./icons/quiz1.js";
import { quiz2 } from "./icons/quiz2.js";
import { quiz3 } from "./icons/quiz3.js";
import { start } from "./icons/start.js";
import { meta } from "./icons/meta.js";
import { alert } from "./icons/alert.js";
import { popupMap } from "./popup.js";
import { popupElement } from "./popupElement.js";
import { track } from "./geolocation.js";
import { vectorGpx } from "./gpxTrack";

//mapa
const raster = new TileLayer({
  source: new OSM({
    attributions: ""
  })
});
//mapa wycentrowana w pozycji
const view = new View({
  center: fromLonLat([17.65, 52.35]),
  zoom: 12.5
});
//geolokalizacja
const geoLay = track(view);
//popup
const popup = popupElement;

const map = new Map({
  controls: defaultControls().extend([new FullScreen()]),
  layers: [
    raster,
    vectorGpx,
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

popupMap(map, popup, popupElement);
