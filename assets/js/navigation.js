// Call API to pull in the data from Trail ID, use that data on the HTML page
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const trailId = urlParams.get("id");
    const apiUrl = "https://www.hikingproject.com/data/get-trails-by-id";
    axios
      .get(`${apiUrl}`, {
        params: {
          ids: trailId,
          key: "200972057-cecb24f98c06e7baf18a485d402ce097",
        },
      })
      .then(({ data }) => {
        const trail = data.trails[0];
        const difficulty = calculateDifficulty(trail);
        const badgeClasses = {
          easy: "badge-success",
          medium: "badge-warning",
          hard: "badge-danger",
        };

        $("#name").text(`${trail.name}`);
        $("#difficulty")
          .text(`${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`)
          .addClass(`${badgeClasses[difficulty]}`);
        $("#length").text(`${trail.length}`);
        $("#lat").text(`${trail.latitude}`);
        $("#long").text(`${trail.longitude}`);

        $("#gear-link").attr(
          "href",
          `gear.html?name=${trail.name}&lat=${trail.latitude}&long=${trail.longitude}&length=${trail.length}&elev=${trail.ascent}`
        );


        // Example Link
        // let mapLink = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCgtovObBinNeIENCPvxfNV2cU2OyAcUoM&q=Space+Needle,Seattle+WA"

        // Google Maps Embeded Link
        let mapLink = "https://www.google.com/maps/embed/v1/place?key="
        let googleKey = "AIzaSyCgtovObBinNeIENCPvxfNV2cU2OyAcUoM" + "&q="
        let latCoordinates = trail.latitude
        let longCoordinates = trail.longitude
        mapLink = mapLink + googleKey + latCoordinates + "," + longCoordinates

        // Google Maps Normal Link
        let mapLink2 = "https://www.google.com/maps/dir//"
        mapLink2 = mapLink2 + latCoordinates + "," + longCoordinates + "/@16z?hl=en-US"

        $("#navigate-btn").attr(
          "href",
          mapLink2
        );

        $("#map").attr("src", mapLink);
        $("#navigation-btn").attr("href", mapLink);
      });
  });
})();
