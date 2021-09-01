import "ol/ol.css";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import { Vector as VectorLayer } from "ol/layer";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import Geolocation from "ol/Geolocation";

const track = function tracking(view) {
  const geolocation = new Geolocation({
    trackingOptions: {
      enableHighAccuracy: true
    },
    projection: view.getProjection()
  });

  geolocation.setTracking(true);

  const accuracyFeature = new Feature();
  geolocation.on("change:accuracyGeometry", function () {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
  });
  const positionFeature = new Feature();

  positionFeature.setStyle(
    new Style({
      image: new CircleStyle({
        radius: 6,
        fill: new Fill({
          color: "#3399CC"
        }),
        stroke: new Stroke({
          color: "#fff",
          width: 2
        })
      })
    })
  );
  geolocation.on("change:position", function () {
    const coordinates = geolocation.getPosition();
    console.log("witam" + coordinates);
    positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
  });

  const geoLayer = new VectorLayer({
    source: new VectorSource({
      features: [accuracyFeature, positionFeature]
    })
  });
  return geoLayer;
};
export { track };
