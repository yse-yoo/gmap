var map;
var marks = {}
var centerPosition = { lat: 35.46598110000001, lng: 139.622062 };
const zoom = 15
var radius = 1000
var geocoder

const alphabets = () => {
    const c = 'A'.charCodeAt(0);
    const alphabets = Array.apply(null, new Array(26)).map((v, i) => {
        return String.fromCharCode(c + i)
    })
    return alphabets
}

const initMap = () => {
    map = new google.maps.Map(document.getElementById("map"), {
        center: centerPosition,
        zoom: zoom,
    })
    geocoder = new google.maps.Geocoder();
    setCenter(centerPosition)
}

const getRadius = () => {
    var radius = document.getElementById('radius').value
    return parseInt(radius)
}

const setCenter = (location) => {
    addMarker(location, 'X');
    addCircle(location)
}

const resetCenter = () => {
    var address = document.getElementById('centerAddress').value
    if (!address) return
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
            var place = results[0]
            var latlng = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            }
            map = new google.maps.Map(document.getElementById("map"), {
                center: latlng,
                zoom: zoom,
            })
            setCenter(latlng)
        }
    })
}

const searchAddress = () => {
    var address = document.getElementById('address').value
    if (!address) return
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
            var place = results[0]
            var placeId = place.place_id
            marks[placeId] = place
            addMarkers()
        }
    })
}

const addMarkers = () => {
    var index = 0
    for (id in marks) {
        var place = marks[id]
        var latlng = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        }
        addMarker(latlng, alphabets[index])
        index++
    }
    map.setCenter(latlng)
}

const addMarker = (location, label) => {
    new google.maps.Marker({
        position: location,
        label: label,
        map: map,
    });
}

const addCircle = (location) => {
    radius = getRadius()
    if (!radius) radius = 1000
    var options = {
        center: location,
        map: map,
        radius: radius,
        strokeColor: 'rgba(255, 0, 0, 0.5)',
        fillColor: 'rgba(255, 0, 0, 0.1)',
    }
    new google.maps.Circle(options);
}

window.onload = (event) => {
    initMap()
}