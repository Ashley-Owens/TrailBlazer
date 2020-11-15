(function () {
  document.addEventListener("DOMContentLoaded", () => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoicm9ubnlsaXU5NSIsImEiOiJja2d6cjlpYW4wbnV2MnlrMHRsMXU2OHdrIn0.QAx2Y__03yIAmx7tuCSyDQ";

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Enter an address",
    });

    geocoder.addTo("#geocoder");

    let latLong = [undefined, undefined];
    let location = undefined;

    geocoder.on("result", function ({ result }) {
      if (result && result.center) {
        latLong = result.center;
        location = result.place_name;
      }
    });

    $("#search-btn").on("click", () => {
      window.location.assign(
        `trails.html?lat=${latLong[1]}&long=${latLong[0]}&location=${location}`
      );
    });
  });
})();
