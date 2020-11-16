/**
 * A Trail returned by the Hiking Project API
 * @typedef {object} Trail
 * @property {number} ascent
 * @property {string} conditionDate - A date in the format "YYYY-MM-DD HH:MM:SS"
 * @property {string} conditionDetails
 * @property {string} conditionStatus
 * @property {number} descent
 * @property {string} difficulty - The difficulty of the trail
 * @property {number} high
 * @property {number} id - The id of the trail
 * @property {string} imgMedium - A url to a medium sized image of the trail
 * @property {string} imgSmall - A url to a small sized image of the trail
 * @property {string} imgSmallMed - A url to a small/medium sized image of the trail
 * @property {string} imgSqSmall - A url to a small sized, square image of the trail
 * @property {number} latitude - The latitude of the trailhead
 * @property {number} length - The length of the trail
 * @property {string} location - The location of the trail in the format "<city>, <state>"
 * @property {number} longitude - The longtitude of the trailhead
 * @property {number} low
 * @property {string} name - The name of the trail
 * @property {number} starVotes - The number of users who have voted on rating of the trail
 * @property {number} stars - The rating of the trail on a 5-star scale
 * @property {string} summary - A short description of the trail
 * @property {string} type - The trail's Hiking Project type
 * @property {string} url - A url to the trail's page on www.hikingproject.com
 */

let trails = [];
let currentTrails = [];
let currentView = "list";


/**
 * Calculates the difficulty of a trail.
 * @param {Trail} trail - The trail to calculate the difficulty for
 * @returns {string} - One of "easy", "medium", or "hard"
 */
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

/**
 * Creates a list-style card containing information about the given trail.
 * @param {Trail} trail
 * @returns {HTMLElement}
 */
const createListCard = (trail) => {
  const trailDifficulty = calculateDifficulty(trail);
  const badgeClasses = {
    easy: "badge-success",
    medium: "badge-warning",
    hard: "badge-danger",
  };

  const card = $(`<div class="card my-3 w-50"></div>`);
  const cardBody = $('<div class="card-body"></div>');
  const cardTitle = $('<div class="d-flex justify-content-between"></div>');

  const name = $(`<h5 class="text-left text-black-50" style="color: #7d8285">
                      ${trail.name}
                    </h5>`);

  // const distance = $(`<div class="d-flex card-text">
  //                         <i class="material-icons" style="color: #7d8285; border-color: #ff6a00"'>
  //                             location_on
  //                         </i>
  //                       </div>`);
  //     <span class="text-black-50" style="color: #ff6a00">
  //     ${trail.distance} miles
  // </span>

  const difficulty = $(`<span class="badge ${
    badgeClasses[trailDifficulty]
  } mt-2">
                            ${
                              trailDifficulty.charAt(0).toUpperCase() +
                              trailDifficulty.slice(1)
                            }
                          </span>`);

  const length = $(`<div class="card-text pt-3">
                      <span>
                          <i class="fas fa-road mr-2" style="color: #7d8285"></i>
                          Trail length: ${trail.length} miles
                      </span>
                    </div>`);

  const trailheadCoordinates = $(`<div class="d-flex justify-content-between card-text pt-3">
                                      <span>
                                          <i class="fas fa-map mr-2" style="color: #7d8285"></i>
                                          Trailhead: lat: ${trail.latitude}, long: ${trail.longitude}
                                      </span>
                                  </div>`);

  const gear = $(`<div class="d-flex justify-content-between card-text pt-3">
                      <span>
                          <i class="fas fa-tshirt mr-2" style="color: #7d8285"></i>
                          <a href="gear.html?name=${trail.name}&id=${trail.id}&length=${trail.length}">Gear &amp; clothing</a>
                      </span>
                  </div>`);

  const navigation = $(`<a href="navigation.html">
                          <button class="btn btn-outline-primary btn-sm mt-4 w-100" type="button">
                            Navigate to the trailhead
                          </button>
                        </a>`);

  // cardTitle.append([name, distance]);
  cardTitle.append(name);
  cardBody.append([
    cardTitle,
    difficulty,
    length,
    trailheadCoordinates,
    gear,
    navigation,
  ]);
  card.append(cardBody);

  return card;
};

/**
 * Creates a grid-style card containing information about the given trail.
 * @param {Trail} trail
 * @returns {HTMLElement}
 */
const createGridCard = (trail) => {
  const trailDifficulty = calculateDifficulty(trail);

  const badgeClasses = {
    easy: "badge-success",
    medium: "badge-warning",
    hard: "badge-danger",
  };

  const card = $(`<div class="card my-3"></div>`);
  const cardBody = $('<div class="card-body"></div>');

  const name = $(`<h6 class="text-left text-black-50" style="color: #7d8285">
                                  ${trail.name}
                              </h6>`);

  const difficulty = $(`<span class="badge ${
    badgeClasses[trailDifficulty]
  } mt-2">
                                  ${
                                    trailDifficulty.charAt(0).toUpperCase() +
                                    trailDifficulty.slice(1)
                                  }
                                </span>`);

  // const distance = $(`<div class="d-flex">
  //                               <i class="material-icons" style="color: #7d8285; border-color: #ff6a00"'>
  //                                   location_on
  //                               </i>
  //                           </div>`);

  //       <span class="text-black-50" style="color: #ff6a00">
  //       ${distance} miles
  //   </span>

  const length = $(`<div class="card-text pt-3">
                              <div style="font-size: 0.9rem">
                                  <i class="fas fa-road mr-2" style="color: #7d8285"></i>
                                  Trail length: ${trail.length} miles
                              </div>
                            </div>`);

  const trailheadCoordinates = $(`<div class="d-flex justify-content-between card-text pt-3">
                                              <span style="font-size: 0.9rem">
                                                  <i class="fas fa-map mr-2" style="color: #7d8285"></i>
                                                  Trailhead: lat: ${trail.latitude}, long: ${trail.longitude}
                                              </span>
                                          </div>`);

  const gear = $(`<div class="d-flex justify-content-between card-text pt-3">
                              <span style="font-size: 0.9rem">
                                  <i class="fas fa-tshirt mr-2" style="color: #7d8285"></i>
                                  <a href="gear.html?name=${trail.name}&id=${trail.id}&length=${trail.length}">Gear &amp; clothing</a>
                              </span>
                          </div>`);

  const navigation = $(`<a href="navigation.html">
                                <button class="btn btn-outline-primary btn-sm mt-4 w-100" type="button">
                                  <span style="font-size: 0.9rem">
                                     Navigate to the trailhead
                                  </span>
                                </button>
                              </a>`);

  cardBody.append([
    name,
    // $('<div class="d-flex justify-content-between"></div>').append([
    //   difficulty,
    //   distance,
    // ]),
    $('<div class="d-flex justify-content-between"></div>').append(difficulty),
    length,
    trailheadCoordinates,
    gear,
    navigation,
  ]);
  card.append(cardBody);

  return card;
};

/**
 * Empties the contents of the global currentTrails array and copies each trail
 * in the global trails array into currentTrails.
 */
const resetTrails = () => {
  currentTrails.splice(0, currentTrails.length);
  Object.assign(currentTrails, trails);
};

/**
 * Displays a list view of the trails from the search results
 * @param {Trail[]} - An array of trails to display in a list view
 */
const toggleListView = (trails) => {
  const trailsContainer = $("#trails").empty().addClass("align-items-center");

  trails.forEach((trail) => {
    trailsContainer.append(createListCard(trail));
  });

  currentView = "list";
};

/**
 * Displays a grid view of the trails from the search results
 * @param {Trail[]} - An array of trails to display in a grid view
 */
const toggleGridView = (trails) => {
  const trailsContainer = $("#trails")
    .empty()
    .removeClass("align-items-center");

  let i = 1;
  let row = $(`<div class="row"></div>`).appendTo(trailsContainer);

  trails.forEach((trail) => {
    // create a new row once the current one has 3 cards
    if (i % 4 === 0) {
      row = $(`<div class="row"></div>`).appendTo(trailsContainer);
      i = 1;
    }

    $(`<div class="col-4"></div>`).append(createGridCard(trail)).appendTo(row);
    i++;
  });

  currentView = "grid";
};

/**
 * Attaches event listeners to the view buttons so that users can toggle between list/grid views
 */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    $("#list-view-btn").on("click", () => {
      if (currentView !== "list") {
        toggleListView(currentTrails);
      }
    });

    $("#grid-view-btn").on("click", () => {
      if (currentView !== "grid") {
        toggleGridView(currentTrails);
      }
    });
  });
})();


// Filters currentTrails array by difficulty rating.
function filterByDifficulty(value) {
  var filteredList = [];
  for (var i = 0; i < currentTrails.length; i++) {
    var rating = calculateDifficulty(currentTrails[i]);
    if (rating === value) {
      filteredList.push(currentTrails[i]);
    }
  }
  return filteredList;
}

// Filters trails according to user request.
function filterTrails() {
  var selectionID = document.getElementById(myStorage.getItem("userSelection"));
  var filteredTrails = filterByDifficulty(selectionID.value);
  currentTrails.splice(0, currentTrails.length);
  Object.assign(currentTrails, filteredTrails);
}


/**
 * Loads the search results based on the coordinates provided in the query string.
 */
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "https://www.hikingproject.com/data/get-trails";
    const params = new URLSearchParams(window.location.search);
    const loadingScreen = $("#loading-screen");
    const results = $("#results");
    const lat = params.get("lat");
    const long = params.get("long");
    const location = params.get("location");

    const displayWarning = () => {
      const resultsContainer = $("#results-container").empty();

      $(
        `<div class="mt-5">
          <a href="index.html">
            <span><i class="fas fa-backspace mr-2 fa-lg" style="color: #7d8285"></i>Back</span>
          </a>
          <div class="text-center text-primary font-weight-bold lead">
            <div class="pt-5 mb-3"><i class="fas fa-exclamation-triangle fa-2x"></i></div>
            <span>Sorry, you entered an invalid location. Please search again with a valid location.</span>
          </div>
        </div>`
      )
        .css(
          "paddingTop",
          $("#navbar")[0].getBoundingClientRect().height + "px"
        )
        .appendTo(resultsContainer);
    };

    if (lat === "undefined" || long === "undefined") {
      displayWarning();
      loadingScreen.addClass("d-none");
      loadingScreen.removeClass("d-flex");
      results.removeClass("d-none");
    } else {
      axios
        .get(`${apiUrl}`, {
          params: {
            lat: lat,
            lon: long,
            maxDistance: 25,
            maxResults: 30,
            sort: "distance",
            key: "200972057-cecb24f98c06e7baf18a485d402ce097",
          },
        })
        .then(({ data }) => {
          trails = data.trails;
          Object.assign(currentTrails, trails);
          
          // Checks for trail filtering request.
          if (window.localStorage.getItem("userSelection")) {
            filterTrails();
          }

          $(document).ready(function(){
            $("#justForYou").click (function () {
          
                if ($(toggle).prop('checked') === true) {
                  resetTrails();
                  input = getSelection();
                  saveSettings(input);
                  filterTrails();

                  // print trails
                  toggleListView(currentTrails);
                  $("#results-count").text(`${currentTrails.length}`);
                  $("#results-location").text(`${location}`);

                } else {
                  resetTrails();

                  // print trails
                  toggleListView(currentTrails);
                  $("#results-count").text(`${currentTrails.length}`);
                  $("#results-location").text(`${location}`);
                }
            })
          });

          toggleListView(currentTrails);
          $("#results-count").text(`${currentTrails.length}`);
          $("#results-location").text(`${location}`);

          loadingScreen.hide();
          loadingScreen.removeClass("d-flex");
          results.removeClass("d-none");
          
        });
    }
  });
})();
