import { Component, Input, ViewChild, ElementRef, NgZone } from "@angular/core";
import { ModalController, AlertController, ToastController, Platform } from "@ionic/angular";
import { ApiService } from "../../services/api.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CacheService } from 'ionic-cache';
import { Location } from "@angular/common";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions, } from '@ionic-native/native-geocoder/ngx';
import { AuthguardService } from 'src/app/services/authguard.service';
declare var google;

interface Marker {
    position: {
        lat: number;
        lng: number;
    };
    tienda: string;
    cod_tendero: number;
    direccion: string;
}

@Component({
    selector: "app-sitios",
    templateUrl: "./sitios.page.html",
    styleUrls: ["./sitios.page.scss"],
})

export class SitiosPage {
    @ViewChild('map', { static: false }) mapElement: ElementRef;
    @Input() cliente;

    _direccion;
    map = null;
    infoWindows: any = [];
    address: string;
    lat: string;
    long: string;
    autocomplete: { input: string; };
    autocompleteItems: any[];
    location: any;
    placeid: any;
    GoogleAutocomplete: any;

    markers: any = this.api.obtenerDirecciones().subscribe(data => {
        this.markers = data;
        console.log(this.markers);
        this.mostrarDireccionT( data )
    });
    
    // 
    R: number = 6371000;
    Rad600m;
    latCliente;
    lngCliente;
    radLatTendero: number;
    radLngTendero;
    total: number;
    sitios_cercanos: any = [];
    tiendas_cercanas: any = [];
    cercanas: any = [];

    constructor(
        private modalController: ModalController,
        private cache: CacheService,
        private api: ApiService,
        private router: Router,
        private alertController: AlertController,
        private _location: Location,
        private route: ActivatedRoute,
        private toastController: ToastController,
        private platform: Platform,
        // 
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder,
        public zone: NgZone,
        private authService: AuthguardService
    ) {
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocomplete = { input: '' };
        this.autocompleteItems = [];
    }

    ionViewDidEnter() {
        // this.loadMap();
    }

    ionViewWillEnter() {
        this._direccion = this.route.snapshot.paramMap.get("direccion");
        // this.mostrarDireccionT();
    }

    // VALIDACION DE DISTANCIAS - TIENDAS CERCANAS
    

    // FUNCIONES GENERALES
    cerrarModal() {
        this._location.back();
    }

    mostrarDireccionT( marcadores ) {
        this.authService.getSession().then(item => {
            let cliente = item;
            this.api.obtenerDireccion(cliente).subscribe(data => {
                let direc = data;
               
                // Se obtiene la direccion del cliente    
                for (let i = 0; i < direc.length; i++) {
                    const lt = direc[i].latitud;
                    const ln = direc[i].longitud;
                    this.loadMap(lt, ln);
                    this.mostrarTiendasCercanas(lt, ln, marcadores)
                }
            });

        });
    }

    mostrarTiendasCercanas(latitud, longitud, marcadores ) {
        this.api.obtenertTendasCercanas().subscribe(data => {
            this.tiendas_cercanas = [];
            this.latCliente = latitud
            this.lngCliente = longitud

            for (let i = 0; i <= data.length; i++) {
                var longitud2: number = data[i].longitud;
                var latitud2: number = data[i].latitud;
                this.calculateDistance(longitud, longitud2, latitud, latitud2);
                this.total = this.calculateDistance(this.lngCliente, longitud2, this.latCliente, latitud2);
                let uM = "KM";
                let x = this.total.toFixed(4);

                // SI la distancia esta entre 0 y <= 0.6000 metros
                if (x > "0" && x <= "0.6") {
                    this.tiendas_cercanas.push(data[i]);
                    // console.warn(data[i].nombretienda)
                }
                // // SINO
                else { }
                this.verSitiosCercanos(this.tiendas_cercanas)
                // this.verProductosCercanos( this.productoscercanos)
            }
        });
    }

    verSitiosCercanos(data) {
        this.cercanas = [];
        this.cercanas = data;
        // console.log(this.cercanas)
    }

    calculateDistance(lon1, lon2, lat1, lat2) {
        let p = 0.017453292519943295; // PI / 180
        let c = Math.cos;
        let a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((lon1 - lon2) * p))) / 2;
        let dis = (12742 * Math.asin(Math.sqrt(a)));
        return dis;
    }

    // METODOS PARA MAPA
    loadMap(latitud, longitud) {
        this.geolocation.getCurrentPosition().then((resp) => {
            // let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            let latLng = new google.maps.LatLng(latitud, longitud);
            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: true
            }

            this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            this.map.addListener('tilesloaded', () => {
                this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
                this.lat = this.map.center.lat()
                this.long = this.map.center.lng()
                this.renderMarkers();

            });
        }).catch((error) => {
            // console.log('Error al encontrar la direccion', error);
        });
    }

    getAddressFromCoords(lattitude, longitude) {
        let options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5
        };
        this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
            .then((result: NativeGeocoderResult[]) => {
                this.address = "";
                let responseAddress = [];
                for (let [key, value] of Object.entries(result[0])) {
                    if (value.length > 0)
                        responseAddress.push(value);
                }
                responseAddress.reverse();
                for (let value of responseAddress) {
                    this.address += value + ", ";
                }
                this.address = this.address.slice(0, -2);
            })
            .catch((error: any) => {
                this.address = "Dirección no disponible!";
            });
    }

    ShowCords() {
        alert('lat' + this.lat + ', long' + this.long)
    }

    UpdateSearchResults() {
        if (this.autocomplete.input == '') {
            this.autocompleteItems = [];
            return;
        }
        this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
            (predictions, status) => {
                this.autocompleteItems = [];
                this.zone.run(() => {
                    predictions.forEach((prediction) => {
                        this.autocompleteItems.push(prediction);
                    });
                });
            });
    }

    SelectSearchResult(item) {
        this.placeid = item.place_id
        this.geocodePlaceId(item);
        this.autocompleteItems = [];
    }

    geocodePlaceId(item) {
        let geocoder = new google.maps.Geocoder();
        let infowindow = google.maps.InfoWindow;

        const placeId = item.place_id;
        geocoder.geocode({ placeId: placeId }, (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    let mapa = this.map;
                    mapa.setZoom(11);
                    mapa.setCenter(results[0].geometry.location);
                    const marker = new google.maps.Marker({
                        mapa,
                        position: results[0].geometry.location,
                    });
                    // infowindow.setContent(results[0].formatted_address);
                    // infowindow.open(mapa, marker);
                } else {
                    window.alert("No results found");
                }
            } else {
                window.alert("Geocoder failed due to: " + status);
            }
        });
    }

    ClearAutocomplete() {
        this.autocompleteItems = []
        this.autocomplete.input = ''
    }

    GoTo() {
        return window.location.href = 'https://www.google.com/maps/search/?api=1&query=Google&query_place_id=' + this.placeid;
    }

    renderMarkers() {
        this.markers.forEach((marker) => {
            this.addMarker(marker);
        });
    }

    addMarker(marker: Marker) {
        let mapMarker = new google.maps.Marker({
            position: marker.position,
            map: this.map,
            tienda: marker.tienda,
            lat: marker.position.lat,
            lng: marker.position.lng,
            cod_tendero: marker.cod_tendero,
            direccion: marker.direccion,
            icon: {
                url: 'assets/img/vecino-maps.png'
            }
        });
        mapMarker.setMap(this.map);
        this.addInfoWindowToMarker(mapMarker);
    }

    addInfoWindowToMarker(marker) {
        let infoWindowContent =
            '<div id="content">' +
            '<h6 id="firstHeading" class"firstHeading">' +
            marker.tienda +
            "</h6>" +
            "<p><b> " +
            marker.direccion +
            "</b></p>" +
            "</div>";

        let infoWindow = new google.maps.InfoWindow({
            content: infoWindowContent,
        });

        marker.addListener("click", () => {
            this.closeAllInfoWindows();
            // this.verTienda(marker.cod_tendero);
            infoWindow.open(this.map, marker);

            marker.addListener(
                "click",
                this.verTienda(marker.cod_tendero, marker.tienda)
            );
        });
        this.infoWindows.push(infoWindow);
    }

    closeAllInfoWindows() {
        for (let window of this.infoWindows) {
            window.close();
        }
    }

    async alertSalir(codigo, tendero) {
        const alert = await this.alertController.create({
            cssClass: "my-custom-class",
            header: "Ir a la Tienda",
            message: "¿Vecino, quieres visitar la tienda<br><br> <b class='ion-text-capitalize'>" + tendero + "</b> ?",
            buttons: [
                {
                    text: "No",
                    role: "cancel",
                    cssClass: "danger",
                    handler: (blah) => {
                    },
                },
                {
                    text: "Si",
                    cssClass: "primary",
                    handler: () => {
                        this.modalController.dismiss();

                        this.authService.getSession().then(data => {
                            let cliente = data;
                            // this.router.navigate(["/categoriasarticulos", cliente[0], codigo]);
                            this.router.navigate(["/categorias", cliente[0], codigo]);
                        });
                    },
                },
            ],
        });
        alert.present();
    }

    verTienda(codigo, tendero) {
        if (codigo != null) {
            this.alertSalir(codigo, tendero);
        }
    }

    async presentToast(message: string, color: string) {
        const toast = await this.toastController.create({
            message,
            color,
            duration: 2000,
            translucent: true,
            position: 'middle'
        });
        toast.present();
    }

}
