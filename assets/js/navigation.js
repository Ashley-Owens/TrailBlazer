// Call API to pull in the data from Trail ID, use that data on the HTML page
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const trailId = urlParams.get("id");
    const apiUrl = "https://www.hikingproject.com/data/get-trails-by-id";


        // let mapLink = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCgtovObBinNeIENCPvxfNV2cU2OyAcUoM&"
        // mapLink = mapLink + "whatever";

        // Tester link --> in the works
        // mapLink = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCgtovObBinNeIENCPvxfNV2cU2OyAcUoM&amp;q=Corvallis%2C+Oregon&amp;zoom=11"

        // https://www.google.com/maps/embed/v1/place?key=AIzaSyCgtovObBinNeIENCPvxfNV2cU2OyAcUoM&amp;q=Corvallis%2C+Oregon&amp;zoom=11
        // gear.html?name=${trail.name}&id=${trail.id}&length=${trail.length}

        mapLink = "https://www.google.com/maps/";

        $("#map").attr("src", mapLink);
        $("#navigation-btn").attr("href", mapLink);
      });
  });
})();
