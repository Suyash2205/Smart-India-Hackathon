function toggleDropdown() {
    var dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

function closeDropdown() {
    var dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = 'none';
}

function getCurrentLocation() {
    closeDropdown();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var mapElement = document.getElementById('map');
            mapElement.style.display = 'block';

            var map = new google.maps.Map(mapElement, {
                center: pos,
                zoom: 15
            });

            var marker = new google.maps.Marker({
                position: pos,
                map: map
            });

            document.getElementById('results').innerHTML = "Latitude: " + pos.lat + 
            "<br>Longitude: " + pos.lng;
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
    closeDropdown();

    var mapElement = document.getElementById('map');
    mapElement.style.display = 'block';

    var map = new google.maps.Map(mapElement, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 15
    });

    var marker = new google.maps.Marker({
        position: {lat: -34.397, lng: 150.644},
        map: map,
        draggable: true
    });

    var input = document.getElementById('search-input');
    input.style.display = 'block';
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        var place = places[0];
        if (!place.geometry) {
            alert("Returned place contains no geometry");
            return;
        }

        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(15);
        }

        marker.setPosition(place.geometry.location);
        document.getElementById('results').innerHTML = "Latitude: " + place.geometry.location.lat() + 
        "<br>Longitude: " + place.geometry.location.lng();
    });

    google.maps.event.addListener(marker, 'dragend', function(event) {
        document.getElementById('results').innerHTML = "Latitude: " + event.latLng.lat() + 
        "<br>Longitude: " + event.latLng.lng();
    });
}

function calculateCredits() {
    var deviceModel = document.getElementById('deviceModel').value;
    document.getElementById('creditResults').innerHTML = "Your " + deviceModel + " is worth 50 credits.";
}

function initMap() {}
