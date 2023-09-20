function toggleDropdown() {
    var dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

function closeDropdown() {
    var dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = 'none';
}

function updateAddressInput(latLng) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': latLng}, function(results, status) {
        if (status === 'OK' && results[0]) {
            document.getElementById('location-address').value = results[0].formatted_address;
        } else {
            console.error('Geocoder failed due to: ' + status);
        }
    });
}

function getCurrentLocation() {
    closeDropdown();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Convert the latitude and longitude to an address and set it in the text box
            updateAddressInput(pos);

            // Display the map icon
            document.getElementById('map-icon').style.display = 'inline-block';

        }, function(error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation. Please enable location access for this website.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    alert("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("An unknown error occurred.");
                    break;
            }
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function openMapInput() {
    var mapElement = document.getElementById('map');
    mapElement.style.display = 'block';

    var currentAddress = document.getElementById('location-address').value;
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({'address': currentAddress}, function(results, status) {
        if (status === 'OK') {
            var pos = results[0].geometry.location;

            var map = new google.maps.Map(mapElement, {
                center: pos,
                zoom: 15
            });

            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                draggable: true
            });

            // Create a custom "Close" button
            var closeButton = document.createElement('div');
            closeButton.innerHTML = 'X';
            closeButton.style.background = '#fff';
            closeButton.style.border = '1px solid #ccc';
            closeButton.style.padding = '5px 10px';
            closeButton.style.cursor = 'pointer';
            closeButton.style.position = 'absolute';
            closeButton.style.top = '10px';
            closeButton.style.right = '10px';
            closeButton.style.zIndex = '5';
            closeButton.onclick = function() {
                mapElement.style.display = 'none';
            };
            mapElement.appendChild(closeButton);

            google.maps.event.addListener(marker, 'dragend', function(event) {
                updateAddressInput(event.latLng);
                mapElement.style.display = 'none'; // Close the map after dragging the marker
            });

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function calculateCredits() {
    var deviceModel = document.getElementById('deviceModel').value;
    document.getElementById('creditResults').innerHTML = "Your " + deviceModel + " is worth 50 credits.";
}

function initMap() {}
