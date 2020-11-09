(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const resetBtn = $("#reset-btn");

    resetBtn.on("click", () => {
      $(".profile-input").each(function () {
        const input = $(this);
        input.val("");

        if (window.localStorage) {
          window.localStorage.removeItem(input.attr("name"));
        }
      });

      if (window.localStorage) {
        window.localStorage.removeItem("fitnessLevel");
        $("#fitness-level").text(
          `Please enter in your profile information above to calculate your fitness level`
        );
      }
    });

    if (window.localStorage) {
      $(".profile-input").each(function () {
        const input = $(this);
        input.val(window.localStorage.getItem(input.attr("name")));
      });

      const fitnessLevel = window.localStorage.getItem("fitnessLevel");

      if (fitnessLevel) {
        $("#fitness-level")
          .text(`Your calculated fitness level is `)
          .append(
            `<span class="text-primary text-bold">${fitnessLevel}</span>`
          );
      } else {
        $("#fitness-level").text(
          `Please enter in your profile information above to calculate your fitness level`
        );
      }
    }
  });
})();
