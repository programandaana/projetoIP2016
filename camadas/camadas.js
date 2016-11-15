(function() {

  var basemaps = {
    OpenStreetMap: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }),
    LandMap: L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://thunderforest.com/">Thunderforest</a> contributors, '
    }),
    WmsLayer: L.tileLayer.wms('http://demo.opengeo.org/geoserver/ows?', {
    layers: 'nasa:bluemarble'
    }),
    GoogleMaps: new L.Google('ROADMAP'),
    GoogleSatellite: new L.Google('SATELLITE'),
    YandexRussia: new L.Yandex(),

  };

  
  window.Camadas = {
    Basemaps: basemaps,
  };

}());
