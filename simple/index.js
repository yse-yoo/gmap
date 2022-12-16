var map;
var marks = {}
const zoom = 15
var centerPosition = { lat: 35.46598110000001, lng: 139.622062 };

const c = 'A'.charCodeAt(0);
const alphabets = Array.apply(null, new Array(26)).map((v, i) => {
    return String.fromCharCode(c + i)
})

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: centerPosition,
        zoom: zoom,
    });
    addMarker(centerPosition, map);
    addCircle(centerPosition)
}

function addMarker(location) {
    new google.maps.Marker({
        position: location,
        label: 'X',
        map: map,
    });
}
function addCircle(location) {
    var circleOpts = {
        center: location,
        map: map,
        radius: 1000,
        strokeColor: 'rgba(255, 0, 0, 0.5)',
        fillColor: 'rgba(255, 0, 0, 0.1)',
    }
    new google.maps.Circle(circleOpts);
}

function searchAddress() {
    var address = document.getElementById('address').value
    if (!address) return

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: address }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var placeId = results[0].place_id
            marks[placeId] = results[0]
            drawMarker()
        } else {
            console.error('Geocode was not successful for the following reason: ' + status)
        }
    })
}

function drawMarker() {
    console.log(marks)
    var index = 0
    for (id in marks) {
        var place = marks[id]
        var latlng = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }
        new google.maps.Marker({
            position: latlng,
            map: map,
            label: alphabets[index]
        })
        index++
    }
    map.setCenter(latlng)
}

window.onload = initMap;