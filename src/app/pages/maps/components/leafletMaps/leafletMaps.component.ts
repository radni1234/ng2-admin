import {Component, ViewEncapsulation, ElementRef} from '@angular/core';

import './leafletMaps.loader';

@Component({
  selector: 'leaflet-maps',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./leafletMaps.scss')],
  template: require('./leafletMaps.html')
})
export class LeafletMaps {

  constructor(private _elementRef:ElementRef) {
  }

  ngAfterViewInit() {
    let el = this._elementRef.nativeElement.querySelector('.leaflet-maps');

    L.Icon.Default.imagePath = 'assets/img/theme/vendor/leaflet';
    var map = L.map(el).setView([45.572093, 19.640413], 13);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([45.572093, 19.640413]).addTo(map)
      .bindPopup('KEM.<br> Easily customizable.')
      .openPopup();
  }
}
