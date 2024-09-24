import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-google-maps',
  template: '',
})
export class GoogleMapsComponent implements OnInit {
  ngOnInit(): void {
    this.loadGoogleMaps();
  }

  loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapAPI}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
}
