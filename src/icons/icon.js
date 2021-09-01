import "ol/ol.css";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { fromLonLat } from "ol/proj";

export default class Ic {
  constructor(lon, lat, descr, source) {
    this.lon = lon;
    this.lat = lat;
    this.descr = descr;
    this.source = source;

    var iconFeature = new Feature({
      geometry: new Point(fromLonLat([lon, lat])),
      name: descr,
      type: "ico"
    });

    var iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 160],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        scale: [0.3, 0.3],
        src: source
      })
    });

    iconFeature.setStyle(iconStyle);
    var vectorSource = new VectorSource({
      features: [iconFeature]
    });
    this.vecLay = new VectorLayer({
      source: vectorSource
    });
  }
}
