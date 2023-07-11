document.getElementById('searchButton').addEventListener('click', () => {
    const searchTerm = document.getElementById('searchInput').value;

    fetch(`/search?term=${encodeURIComponent(searchTerm)}`)
        .then(response => response.json())
        .then(data => {
            // Clear previous search results
            console.log(data)
            document.getElementById('searchResults').innerHTML = '';

            // Render new search results
            data.forEach(item => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');

                const imageElement = document.createElement('img');
                imageElement.src = item.album.images[1].url;
                imageElement.alt = 'Album Image';
                imageElement.classList.add('card-img');
                cardElement.appendChild(imageElement);

                const infoElement = document.createElement('div');
                infoElement.classList.add('card-info');

                const nameElement = document.createElement('p');
                nameElement.textContent = `Track Name: ${item.name}`;
                infoElement.appendChild(nameElement);

                const artistElement = document.createElement('p');
                artistElement.textContent = `Artist(s): ${item.artists[0].name}`;
                infoElement.appendChild(artistElement);

                const albumElement = document.createElement('p');
                albumElement.textContent = `Album: ${item.album.name}`;
                infoElement.appendChild(albumElement);

                const audioElement = document.createElement('audio');
                audioElement.controls = true;
                audioElement.src = item.preview_url;
                audioElement.classList.add('card-audio');
                infoElement.appendChild(audioElement);

                cardElement.appendChild(infoElement);

                document.getElementById('searchResults').appendChild(cardElement);
            });
        })
        .catch(error => console.error('Error during search:', error));
});
