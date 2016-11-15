(function (window) {
    'use strict';

    function initMap() {
        var L = window.L;
       
        var mymap = L.map('mapid', {
            center:[-29.68, -53.81],
            zoom:10,
            layers: [Camadas.Basemaps.OpenStreetMap]
        });
        
        var baseLayers = {            
            "Google":Camadas.Basemaps.GoogleMaps,
            "Google Satélite":Camadas.Basemaps.GoogleSatellite,
            "OpenStreetMap": Camadas.Basemaps.OpenStreetMap,
            "Landscape": Camadas.Basemaps.LandMap,
            "NASA": Camadas.Basemaps.WmsLayer,
            "Yandex (Rússia)": Camadas.Basemaps.YandexRussia
        };

        var track = new L.KML("zoneamento.kml", {async: true});
            track.on("loaded", function(e) { mymap.fitBounds(e.target.getBounds());
        })
        .addTo(mymap);

        var bai1style={
            "color":"white",
            "weigth":0.5,
            "opacity":0
        };
        var customLayer = L.geoJson(null, {
            style: bai1style
        })
        .addTo(mymap);
        var runLayer = omnivore.kml('zoneamento.kml')
            .on('ready', function() {
            mymap.fitBounds(runLayer.getBounds());
            runLayer.eachLayer(function(layer) {
            layer.bindPopup(layer.feature.properties.description);
            layer.setStyle(bai1style);
            layer.bindLabel(layer.feature.properties.name, {noHide:true });
            });
        })
        .addTo(mymap);
         
         var groupedOverlays = {
            "Camadas":{
                "Atributos": runLayer,
                "Bairros": track,
            }
            
        };
       
        var options = {
            groupCheckboxes: true,
            collapsed: true,
        };


        L.Control.GroupedLayers.include({
            addOverlays: function () {
                for (var i in this._layers) {
                    if (this._layers[i].overlay) {
                        if (!this._map.hasLayer(this._layers[i].layer)) {
                            this._map.addLayer(this._layers[i].layer);
                        }
                    }
                }
            },
            removeOverlays: function () {
                for (var i in this._layers) {
                    if (this._layers[i].overlay) {
                        if (this._map.hasLayer(this._layers[i].layer)) {
                            this._map.removeLayer(this._layers[i].layer);
                        }
                    }
                }
            }
        });

        var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, options);
        mymap.addControl(layerControl);

        L.DomEvent.addListener(L.DomUtil.get('adicionar'), 'click', function () {
            layerControl.addOverlays();
        });

        L.DomEvent.addListener(L.DomUtil.get('remover'), 'click', function () {
            layerControl.removeOverlays();
        });

        var popup = L.popup();

        function onMapClick(e) {
            popup
            .setLatLng(e.latlng)
            .setContent("Coordenadas do ponto: " + e.latlng.toString())
            .openOn(mymap);
        }

        mymap.on('click', onMapClick);
    
       var drawnItems = new L.FeatureGroup();
        mymap.addLayer(drawnItems);

        var drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems
            }
        });
        mymap.addControl(drawControl);

        mymap.on('draw:created', function (e) {
            var type = e.layerType,
                layer = e.layer;
                drawnItems.addLayer(layer);
        });

        var style = {
            color: 'red',
            opacity: 1.0,
            fillOpacity: 1.0,
            weight: 2,
            clickable: false
        };
        L.Control.FileLayerLoad.LABEL = '<img class="icon" src="folder.svg" alt="file icon"/>';
        L.Control.fileLayerLoad({
            fitBounds: true,
            layerOptions: {
                style: style,
                pointToLayer: function (data, latlng) {
                    return L.circleMarker(
                    latlng,
                    { style: style }
                    );
                }
            }
        }).addTo(mymap);
    }

    window.addEventListener('load', function () {
        initMap();
    });
}(window));
