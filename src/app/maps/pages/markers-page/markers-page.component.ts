import { Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  marker: Marker;
  color: string;
}

interface PlainMarker {
  color: string
  lnglat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {
  @ViewChild('map') divMap!: ElementRef;

  markers: MarkerAndColor[] = [];

  map?: Map;
  currentCenter: LngLat = new LngLat(-74.80632870594147, 10.994082319181956);

  ngAfterViewInit(): void {

    if (!this.divMap) throw 'The map element is not found'

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    this.loadFromLocalStorage();

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Carlos'

    // const marker = new Marker({
    //   element: markerHtml
    // })
    //   .setLngLat(this.currentCenter)
    //   .addTo(this.map);

  }

  createMarker() {

    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);

  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color,
      draggable: true
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({
      marker,
      color
    });

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    })

    this.saveToLocalStorage();
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);

    this.saveToLocalStorage();

  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    });
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(({ color, marker }) => ({
        color,
        lnglat: marker.getLngLat().toArray()
    }))

    localStorage.setItem('markers', JSON.stringify(plainMarkers));
  }

  loadFromLocalStorage() {
    const plainMarkers = localStorage.getItem('markers') ?? '[]';
    const plainMarkersParsed: PlainMarker[] = JSON.parse(plainMarkers);

    plainMarkersParsed.forEach(({ color, lnglat }) => {

      const [lng, lat] = lnglat;
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, color);
    })

  }
}
