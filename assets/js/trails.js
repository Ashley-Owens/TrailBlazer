(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const trails = [
      {
        name: "Marina Trail",
        distance: 3.7,
        latLong: [32.312, 19.231],
        length: 1.5,
        difficulty: "easy",
      },
      {
        name: "CS 325 HW Trail",
        distance: 4.7,
        latLong: [32.312, 19.231],
        length: 8.1,
        difficulty: "medium",
      },
      {
        name: "Mt. Baldy Devil's Backbone Trail",
        distance: 6.2,
        latLong: [32.312, 19.231],
        length: 3.3,
        difficulty: "easy",
      },
      {
        name: "Another Trail",
        distance: 8.7,
        latLong: [32.312, 19.231],
        length: 8.1,
        difficulty: "medium",
      },
      {
        name: "Some Trail",
        distance: 9.9,
        latLong: [32.312, 19.231],
        length: 12,
        difficulty: "hard",
      },
    ];
    const trailsContainer = $("#trails");
    const listViewBtn = $("#list-view-btn");
    const gridViewBtn = $("#grid-view-btn");
    let currentView = "list";

    listViewBtn.on("click", () => {
      if (currentView !== "list") {
        trailsContainer.empty();

        trails.forEach((trail) => {
          trailsContainer.append(createListCard(trail));
        });

        trailsContainer.addClass("align-items-center");
        currentView = "list";
      }
    });

    gridViewBtn.on("click", () => {
      if (currentView !== "grid") {
        trailsContainer.empty();

        let i = 1;
        let row = $(`<div class="row"></div>`);
        trailsContainer.append(row);

        trails.forEach((trail) => {
          if (i % 4 === 0) {
            row = $(`<div class="row"></div>`).appendTo(trailsContainer);
            i = 1;
          }

          $(`<div class="col-4"></div>`)
            .append(createGridCard(trail))
            .appendTo(row);
          i++;
        });

        trailsContainer.removeClass("align-items-center");
        currentView = "grid";
      }
    });

    const createListCard = (trail) => {
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

      const distance = $(`<div class="d-flex card-text">
                            <i class="material-icons" style="color: #7d8285; border-color: #ff6a00"'>
                                location_on
                            </i>
                            <span class="text-black-50" style="color: #ff6a00">
                                ${trail.distance} miles
                            </span>
                        </div>`);

      const difficulty = $(`<span class="badge ${
        badgeClasses[trail.difficulty]
      } mt-2">
                            ${
                              trail.difficulty.charAt(0).toUpperCase() +
                              trail.difficulty.slice(1)
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
                                            Trailhead: lat - ${trail.latLong[0]}, long - ${trail.latLong[1]}
                                        </span>
                                    </div>`);

      const gear = $(`<div class="d-flex justify-content-between card-text pt-3">
                        <span>
                            <i class="fas fa-tshirt mr-2" style="color: #7d8285"></i>
                            <a href="gear.html">Gear &amp; clothing</a>
                        </span>
                    </div>`);

      const navigation = $(`<a href="navigation.html">
                            <button class="btn btn-outline-primary btn-sm mt-4 w-100" type="button">
                              Navigate to the trailhead
                            </button>
                          </a>`);

      cardTitle.append([name, distance]);
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

    const createGridCard = (trail) => {
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
        badgeClasses[trail.difficulty]
      } mt-2">
                              ${
                                trail.difficulty.charAt(0).toUpperCase() +
                                trail.difficulty.slice(1)
                              }
                            </span>`);

      const distance = $(`<div class="d-flex">
                            <i class="material-icons" style="color: #7d8285; border-color: #ff6a00"'>
                                location_on
                            </i>
                            <span class="text-black-50" style="color: #ff6a00">
                                ${trail.distance} miles
                            </span>
                        </div>`);

      const length = $(`<div class="card-text pt-3">
                          <div style="font-size: 0.9rem">
                              <i class="fas fa-road mr-2" style="color: #7d8285"></i>
                              Trail length: ${trail.length} miles
                          </div>
                        </div>`);

      const trailheadCoordinates = $(`<div class="d-flex justify-content-between card-text pt-3">
                                          <span style="font-size: 0.9rem">
                                              <i class="fas fa-map mr-2" style="color: #7d8285"></i>
                                              Trailhead: lat - ${trail.latLong[0]}, long - ${trail.latLong[1]}
                                          </span>
                                      </div>`);

      const gear = $(`<div class="d-flex justify-content-between card-text pt-3">
                          <span style="font-size: 0.9rem">
                              <i class="fas fa-tshirt mr-2" style="color: #7d8285"></i>
                              <a href="gear.html">Gear &amp; clothing</a>
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
        $('<div class="d-flex justify-content-between"></div>').append([
          difficulty,
          distance,
        ]),
        length,
        trailheadCoordinates,
        gear,
        navigation,
      ]);
      card.append(cardBody);

      return card;
    };
  });
})();
