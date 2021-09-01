import Overlay from "ol/Overlay";

const popupElement = document.getElementById("popup");
const popup = new Overlay({
  element: popupElement,
  positioning: "bottom-center",
  stopEvent: true,
  offset: [0, -40]
});

export { popup };
