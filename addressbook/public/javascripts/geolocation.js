var x = document.getElementById("latlong");
var y =
document.getElementById("embeddedmap");

function getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosi
    tion(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {x.innerHTML = 'Latitude: ' +
    position.coords.latitude + '<br>Longitude:
    ' +
    position.coords.longitude;
    y.innerHTML = '<iframe width="300"
    height="170" frameborder="0" scrolling="no"
    marginheight="0" marginwidth="0"
    src="https://maps.google.com/maps?q=' +
    position.coords.latitude +','+
    position.coords.longitude +
    '&hl=es;z=14&amp;output=embed"> </iframe>';
}