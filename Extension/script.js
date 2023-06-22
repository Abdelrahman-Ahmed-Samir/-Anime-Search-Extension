document.getElementById("animeForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the entered anime title
    var animeTitle = document.getElementById("animeInput").value;

    // Make the API request and display the results
    searchAnime(animeTitle);
});

function searchAnime(title) {
    var apiUrl = "https://myanimelist.p.rapidapi.com/anime/search/" + encodeURIComponent(title);

    // Make an HTTP request to the API
    fetch(apiUrl, {
        headers: {
            "X-RapidAPI-Key": "48726824c1msh730906eb6db351dp1fe05ejsn070df7eba41e",
            "X-RapidAPI-Host": "myanimelist.p.rapidapi.com"
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        displayResults(data);
    })
    .catch(function(error) {
        console.log("An error occurred:", error);
    });
}

function displayResults(results) {
    var resultContainer = document.getElementById("resultContainer");

    // Clear previous results
    resultContainer.innerHTML = "";

    if (results.length === 0) {
        resultContainer.textContent = "No results found.";
    } else {
        for (var i = 0; i < results.length; i++) {
            var result = results[i];

            var animeLink = document.createElement("a");
            animeLink.href = result.myanimelist_url;
            animeLink.textContent = result.title;

            var animeDescription = document.createElement("p");
            animeDescription.textContent = result.description;

            var animeImage = document.createElement("img");
            animeImage.src = result.picture_url;

            var animeItem = document.createElement("div");
            animeItem.appendChild(animeLink);
            animeItem.appendChild(animeDescription);
            animeItem.appendChild(animeImage);

            resultContainer.appendChild(animeItem);
        }
    }
}
