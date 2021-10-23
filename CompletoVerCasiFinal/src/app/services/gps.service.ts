import { Injectable, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
    providedIn: 'root'
})
export class GpsService {

    logs: String[] = [];
    latitude: any = 0; //latitude
    longitude: any = 0; //longitude

    constructor(private geolocation: Geolocation) { }

    ionViewWillEnter() {
        this.getCurrentCoordinates();
    }

    

    // averiguarDireccion() {
    //     // this.geolocation.getCurrentPosition().then((resp) => {
    //     //     // resp.coords.latitude
    //     //     // resp.coords.longitude
    //     // }).catch((error) => {
    //     //     console.log('Error getting location', error);
    //     // });

    //     let watch = this.geolocation.watchPosition();
    //     watch.subscribe((data: any) => {
    //         // data can be a set of coordinates, or an error (if an error occurred).
    //         // data.coords.latitude
    //         // data.coords.longitude
    //         this.logs.push("latitud: " + data.coords.latitude + " longitud : " + data.coords.longitude)
    //         console.log(this.logs);
    //     });
    // }
    options = {
        timeout: 10000,
        enableHighAccuracy: true,
        maximumAge: 3600
    };
    getCurrentCoordinates() {
        this.geolocation.getCurrentPosition().then((resp) => {
            this.latitude = resp.coords.latitude;
            this.longitude = resp.coords.longitude;

            console.log( this.latitude);
            console.log( this.longitude);

        }).catch((error) => {
            console.log('Error al encontrar coordenadas', error);
        });
    }

}
