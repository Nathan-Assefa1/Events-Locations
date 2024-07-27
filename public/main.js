
document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('city').value.trim(); // Remove any leading or trailing spaces
    const state = document.getElementById('state').value.trim();

    if (city === '' || state === '') {
        // If the city field is empty, show an error message
        document.getElementById('results').innerHTML = 'Please enter both a city and state name.';
        return;
    }
    const url = `https://event-organizer-taupe.vercel.app/events?city=${encodeURIComponent(city)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            display(data.events_results);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('results').innerHTML = 'An error occurred while fetching data.';
        });
});

// Displays all of the event results from the JSON response
function display(data) {
    const divResult = document.getElementById('results');
    divResult.innerHTML = '';
    let resultData = '';
    if (data) {
        for (const element of data) {
            resultData += `<h2><a href="${element.link}" target="_blank">${element.title}</a></h2>
            <p>${element.description}</p><hr>`;
        }
        divResult.innerHTML = resultData;
    } else {
        divResult.innerHTML = 'No results found';
    }
}

