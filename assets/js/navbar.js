(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const content = document.getElementById("content");

    content.style.paddingTop = navbar.getBoundingClientRect().height + "px";
  });
})();
