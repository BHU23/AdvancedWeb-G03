import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-google-maps',
  template: '',
})
export class GoogleMapsComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleMaps();
    }
  }

  loadGoogleMaps() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapAPI}&libraries=places`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
}
