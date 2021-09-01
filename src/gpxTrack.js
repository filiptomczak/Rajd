import "ol/ol.css";
import GPX from "ol/format/GPX";
import VectorSource from "ol/source/Vector";
import { Vector as VectorLayer } from "ol/layer";
import { Stroke, Style } from "ol/style";

const style = {
  MultiLineString: new Style({
    stroke: new Stroke({
      color: "#F037A5",
      width: 3
    })
  })
};
const vectorGpx = new VectorLayer({
  source: new VectorSource({
    url: "src/gpx/new.gpx",
    format: new GPX()
  }),
  style: function (feature) {
    return style[feature.getGeometry().getType()];
  }
});

export { vectorGpx };
