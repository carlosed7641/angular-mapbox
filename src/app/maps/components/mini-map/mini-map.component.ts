import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styles: `
    div {
      width: 100%;
      height: 150px;
      margin: 0;
    }
  `
})
export class MiniMapComponent {
  @Input()
  lngLat?: [number, number];

  @ViewChild('map')
  divMap?: ElementRef;

  ngAfterViewInit() {

    if (!this.divMap) throw new Error('divMap is required');
    if (!this.lngLat) throw new Error('lngLat is required');

    const map = new Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    new Marker({
      color
    })
      .setLngLat(this.lngLat)
      .addTo(map);
  }
}
