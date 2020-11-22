const urlParams = new URLSearchParams(window.location.search);
const trailName = urlParams.get('name');
const trailId = urlParams.get('id');
const trailLength = urlParams.get('length');

$('.masthead-heading').text(trailName)

const updateHeaders = (conditions) => {
    $('.condition-status').text(conditions.conditionStatus)
    $('.estimated-time').text(trailLength + " miles")
}

// TODO refactor URL query params for other nav pages, continue to edit gear page
(function () {
    document.addEventListener("DOMContentLoaded", () => {
        const apiUrl = "https://www.hikingproject.com/data/get-conditions";
        axios
            .get(`${apiUrl}`, {
                params: {
                ids: trailId,
                key: "200972057-cecb24f98c06e7baf18a485d402ce097",
                },
            })
            .then(({ data }) => {
                updateHeaders(data[0])
        })
    }
)
})();