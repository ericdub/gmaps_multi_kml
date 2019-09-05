var map = null;
var layers = [];
var infowindow;
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: 'terrain'
    });
    infowindow = new google.maps.InfoWindow({
      pixelOffset: new google.maps.Size(300, 0),
    });
    function showInContentWindow(kmlEvent) {
        var content = "<div>" + kmlEvent.featureData.description + "</div>";
        infowindow.setPosition(kmlEvent.latLng);
        infowindow.setOptions({
        pixelOffset:kmlEvent.pixelOffset,
        content: content});
        infowindow.open(map);
    }
    var bounds;
    layers[0] = new google.maps.KmlLayer({
        url: 'http://www.lasvegasjeeptrails.com/kmz/Rocky-Gap-Trail.kmz',
        suppressInfoWindows: true,
        preserveViewport: true,
        map: map
    });
    google.maps.event.addListener(layers[0], "defaultviewport_changed", function() {
      if (!bounds) {
        bounds = layers[0].getDefaultViewport();
      } else {
        bounds.union(layers[0].getDefaultViewport());
      }
      map.fitBounds(bounds);
    });
    google.maps.event.addListener(layers[0], "click", showInContentWindow);

    layers[1] = new google.maps.KmlLayer({
        url: 'http://www.lasvegasjeeptrails.com/kmz/Angel-Peak.kmz',
        suppressInfoWindows: true,
        preserveViewport: true,
        map: map
    });
    google.maps.event.addListener(layers[1], "defaultviewport_changed", function() {
      if (!bounds) {
        bounds = layers[1].getDefaultViewport();
      } else {
        bounds.union(layers[1].getDefaultViewport());
      }
      map.fitBounds(bounds);
    });
    google.maps.event.addListener(layers[1], "click", showInContentWindow);

    for (var i = 0; i < layers.length; i++) {
        layers[i].setMap(map);
    }

}


function toggleLayer(i) {
  if (layers[i].getMap() === null) {
    layers[i].setMap(map);
  } else {
    layers[i].setMap(null);
  }
}
google.maps.event.addDomListener(window, 'load', initMap);
