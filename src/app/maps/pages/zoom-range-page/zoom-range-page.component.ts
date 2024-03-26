import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map') divMap!: ElementRef;

  zoom: number = 10;
  map?: Map;
  currentCenter: LngLat = new LngLat(-74.80632870594147, 10.994082319181956);

  ngAfterViewInit(): void {

    if (!this.divMap) throw 'The map element is not found'

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners() {
    if (!this.map) throw 'The map is not initialized'

    this.map.on('zoom', () => {
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend', () => {
      if (this.map!.getZoom() < 18) return

      this.map!.zoomTo(18);
    })

    this.map.on('move', () => {
      this.currentCenter = this.map!.getCenter();
    })
  }

  zoomOut() {
    this.map!.zoomOut();
  }

  zoomIn() {
    this.map!.zoomIn();
  }

  zoomChange(value: string) {
    this.zoom = Number(value);

    this.map!.zoomTo(this.zoom);
  }
}
