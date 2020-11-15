(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const navbar = $("#navbar");
    const content = $(".content");

    content.css("paddingTop", navbar[0].getBoundingClientRect().height + "px");
  });
})();
