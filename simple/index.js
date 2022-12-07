var map;

function initMap() {
    var position = { lat: -35.397, lng: 150.644 };
    var zoom = 3
    map = new google.maps.Map(document.getElementById("map"), {
        center: position,
        zoom: zoom,
    });

    addMarker(position, map);
}

function addMarker(location, map) {
    new google.maps.Marker({
        position: location,
        label: 'A',
        map: map,
    });
}

window.onload = initMap;