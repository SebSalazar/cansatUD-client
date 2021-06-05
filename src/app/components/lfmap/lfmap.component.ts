import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-lfmap',
  templateUrl: './lfmap.component.html',
  styleUrls: ['./lfmap.component.css']
})
export class LfmapComponent implements OnInit {
  public map: any;

  constructor() { }

  ngOnInit(): void {

  }

  start(): any {



    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3
    });


    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    this.map.setView([4.6790506, -74.0922868], 10);
    return this.map;
  }

  returnMap() {
    return this.map;
  }

  addPoint(map, x, y) {

    const greenIcon = L.icon({
      iconUrl: '../../../assets/img/marker.png',
      iconSize: [38, 50], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 50], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    const at = L.marker([x, y], { icon: greenIcon }).bindPopup('This is at, CO.');
    at.addTo(map);
    return at;
  }

  removeMark(map, at) {
    map.removeLayer(at);
  }

}
