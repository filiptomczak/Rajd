import { View } from "ol";
import { fromLonLat } from "ol/proj";
import { boundingExtent } from "ol/extent";

function popupMap(map, popup, element) {
  map.on("click", function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      return feature;
    });
    popup.setPosition(undefined);
    if (feature) {
      const z = feature.getProperties();
      if (z.type === "ico" ? true : false) {
        const coordinates = feature.getGeometry().getCoordinates();
        popup.setPosition(coordinates);
        element.innerHTML = feature.get("name");

        map.getView().fit(feature.getGeometry(), {
          duration: 1000,
          maxZoom: 14
        });
      } else {
        popup.setPosition(undefined);
      }
    }
  });

  map.on("pointermove", function (evt) {
    const hit = this.forEachFeatureAtPixel(evt.pixel, function (
      feature,
      layer
    ) {
      const z = feature.getProperties();
      return z.type === "ico" ? true : false;
    });
    if (hit) {
      this.getTargetElement().style.cursor = "pointer";
    } else {
      this.getTargetElement().style.cursor = "";
    }
  });
}
export { popupMap };
