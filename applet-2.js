class LeafletMap {

    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();

        this.attendanceCountBNL = 0;
        this.attendanceCountAS = 0;
        this.attendanceCountDS = 0;

        this.markerCounts = {};
        this.markers = [];

        this.loggedData = []; 

        
        this.btn = document.getElementById('btn');
        this.btn1 = document.getElementById('btn1');
        this.btn2 = document.getElementById('btn2');
        this.btnclear = document.getElementById('btnclear');
        this.logCountElement = document.getElementById('logCountBNL');
        this.logCount1Element = document.getElementById('logCountAS');
        this.logCount2Element = document.getElementById('logCountDS');
        this.idContainer = document.getElementById('logContainer');

      

    }


    initTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    addMarker(lat, lng, message) {
        const marker = L.marker([lat, lng]).addTo(this.map);
        marker.bindPopup(message);
    }

    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    this.addMarker(marker.latitude, marker.longitude, marker.message);
                });
            })
            .catch(error => console.error('Error loading markers:', error));
    }
}

const myMap = new LeafletMap('map', [8.578109, 124.927519], 18);



myMap.addMarker(8.577188,124.928062, 'Balay ni lalang');
myMap.addMarker(8.577390,124.928073, 'Adlawan store');
myMap.addMarker(8.578753,124.928041, 'Domo store');



myMap.loadMarkersFromJson('applet.json');

