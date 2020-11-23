// const urlParams = new URLSearchParams(window.location.search);
// const trailName = urlParams.get('name');
// const trailId = urlParams.get('id');
// const trailLength = urlParams.get('length');

// $('.masthead-heading').text(trailName)
// $('.masthead-heading').append("\n(ID: " + trailId + ")")

// const updateHeaders = (conditions) => {
//     $('.condition-status').text(conditions.conditionStatus)
//     $('.estimated-time').text(trailLength + " miles")
// }

const calculateDifficulty = (trail) => {
    let difficulty;
  
    // convert the Hiking Project difficulty to a TrailBlazer difficulty
    switch (trail.difficulty) {
      case "green":
        difficulty = "easy";
        break;
      case "greenBlue":
      case "blue":
        difficulty = "medium";
        break;
      case "blueBlack":
      case "black":
        difficulty = "hard";
        break;
      default:
        difficulty = "hard";
        break;
    }
  
    return difficulty;
  };



// TODO refactor URL query params for other nav pages, continue to edit gear page
(function () {
    document.addEventListener("DOMContentLoaded", () => {
        const urlParams = new URLSearchParams(window.location.search);
        const trailId = urlParams.get('id');
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
                // console.log(trail)
                const difficulty = calculateDifficulty(trail);
                const badgeClasses = {
                    easy: "badge-success",
                    medium: "badge-warning",
                    hard: "badge-danger",
                }

                $("#name").text(`${trail.name}`)
                $("#difficulty").text(`${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`).addClass(`${badgeClasses[difficulty]}`)
                $("#length").text(`${trail.length}`)
                $("#lat").text(`${trail.latitude}`)
                $("#long").text(`${trail.longitude}`)

                $("#gear-link").attr("href", `gear.html?name=${trail.name}&id=${trail.id}&length=${trail.length}`)

                // let mapLink = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCgtovObBinNeIENCPvxfNV2cU2OyAcUoM&"
                // mapLink = mapLink + "whatever";

                // Tester link
                // mapLink = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCgtovObBinNeIENCPvxfNV2cU2OyAcUoM&amp;q=Corvallis%2C+Oregon&amp;zoom=11"
                mapLink = "https://www.google.com/maps/"


                $("#map").attr("src", mapLink);
                $("#navigation-btn").attr("href", mapLink);

        })
    }
)
})();

someFunction()

// https://www.google.com/maps/embed/v1/place?key=AIzaSyCgtovObBinNeIENCPvxfNV2cU2OyAcUoM&amp;q=Corvallis%2C+Oregon&amp;zoom=11


// gear.html?name=${trail.name}&id=${trail.id}&length=${trail.length}

