(function () {
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $(".avatar-bg").css({
          background: "url(" + e.target.result + ")",
          "background-size": "cover",
          "background-position": "50% 50%",
        });
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  function toggleAlert(clasz, display) {
    $(".alert")
      .removeClass("display")
      .removeClass("alert-info")
      .removeClass("alert-success")
      .removeClass("alert-danger")
      .addClass(clasz);
    if (display) {
      $(".alert").addClass("display");
    }
    if (clasz === "alert-success") {
      $(".alert > span").text("Profile saved");
    } else if (clasz === "alert-danger") {
      $(".alert > span").text("Profile reset");
    }
  }

  $("input.form-control[name=avatar-file]").change(function () {
    readURL(this);
  });

  const calculateFitnessLevel = (profile) => {
    // calculate fitness level and assign it to a variable called "fitnessLevel"
    var age = window.localStorage.getItem("age")
    var level = window.localStorage.getItem("activityLevel")
    var weight = window.localStorage.getItem("weight")
    var fitnessLevel = 0

    // calculate fitness level on a scale of 10 pts, with weighted values
    if (weight == "Large") {
      fitnessLevel = fitnessLevel + 1
    } else if (weight == "Normal") {
      fitnessLevel = fitnessLevel + 2
    } else if (weight == "Fit") {
      fitnessLevel = fitnessLevel + 3
    } else {
      fitnessLevel = fitnessLevel
    }

    if (level == "Extremely Inactive") {
      fitnessLevel = fitnessLevel + 0
    } else if (level == "Sedentary") {
      fitnessLevel = fitnessLevel + 1
    } else if (level == "Moderately Active") {
      fitnessLevel = fitnessLevel + 2
    } else if (level == "Vigorously Active") {
      fitnessLevel = fitnessLevel + 3
    } else if (level == "Extremely Active") {
      fitnessLevel = fitnessLevel + 4
    } else {
      fitnessLevel = fitnessLevel
    }
    
    var age = parseInt(age)
    // fitnessLevel = typeof age
    
    if (age < 10) {
      fitnessLevel = fitnessLevel - 10
    } else if (age < 15) {
      fitnessLevel = fitnessLevel + 1
    } else if (age < 35) {
      fitnessLevel = fitnessLevel + 3
    } else if (age < 45) {
      fitnessLevel = fitnessLevel + 2
    } else if (age < 55) {
      fitnessLevel = fitnessLevel + 1
    } else if (age >= 65) {
      fitnessLevel = fitnessLevel - 2
    } else {
      fitnessLevel = fitnessLevel
    }

    if (fitnessLevel < 0) {
      fitnessLevel = 0
    } else {
      fitnessLevel = fitnessLevel
    }

    if (fitnessLevel == 0) {
      fitnessLevel = fitnessLevel + "  , Sorry, you are too young"
    } else if (fitnessLevel <= 4 ) {
      fitnessLevel = fitnessLevel + "  , Easy"
    } else if (fitnessLevel <= 7 ) {
      fitnessLevel = fitnessLevel + "  , Medium"
    } else if (fitnessLevel <= 10 ) {
      fitnessLevel = fitnessLevel + "  , Hard"
    } else {
      fitnessLevel = fitnessLevel
    }

    $("#fitness-level")
      .text(`Your calculated fitness level is `)
      .append($(`<span class="text-primary text-bold">${fitnessLevel}</span>`));

    if (window.localStorage) {
      window.localStorage.setItem("fitnessLevel", fitnessLevel);
    }
  };

  $("#profile").delegate("form", "submit", function (e) {
    var inst = this;
    var formData = new FormData($(this)[0]);

    for (const [name, value] of formData.entries()) {
      if (window.localStorage) {
        window.localStorage.setItem(name, value);
      }
    }

    calculateFitnessLevel(formData.entries());

    $(inst)
      .find("button[type = submit]")
      .addClass("loading")
      .prop("disabled", true);
    toggleAlert("alert-success", true);

    setTimeout(function () {
      $(inst)
        .find("button[type = submit]")
        .removeClass("loading")
        .prop("disabled", false);
      toggleAlert("alert-success");
    }, 1000);

    return false;
  });

  $("#profile").delegate("form", "reset", function (e) {
    var inst = this;
    var formData = new FormData($(this)[0]);

    $(inst)
      .find("button[type = reset]")
      .addClass("loading")
      .prop("disabled", true);
    toggleAlert("alert-danger", true);

    setTimeout(function () {
      $(inst)
        .find("button[type = reset]")
        .removeClass("loading")
        .prop("disabled", false);
      toggleAlert("alert-danger");
    }, 1000);

    return false;
  });
})();
