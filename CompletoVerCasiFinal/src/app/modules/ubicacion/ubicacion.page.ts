import { Component, Input, ViewChild, ElementRef, NgZone } from "@angular/core";
import { AlertController, LoadingController,  ToastController, Platform, ModalController, MenuController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from "@angular/router";
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { ApiService } from "../../services/api.service";
import { UbicacionInterface } from "../../interfaces/ubicacion.interface";
import { UbicacionItem, UbicacionStorageService } from "../../services/ubicacion-storage.service";
declare var google;

@Component({
    selector: 'app-ubicacion',
    templateUrl: './ubicacion.page.html',
    styleUrls: ['./ubicacion.page.scss'],
})

export class UbicacionPage {
    
    @ViewChild('map', { static: false }) mapElement: ElementRef;
    items: UbicacionItem[] = [];
    newItem: UbicacionItem = <UbicacionItem>{};

    inicial: boolean;
    ingubicacion: boolean;
    detectubicacion: boolean;
    observador = null;

    departamentos = [
        { value: 'AMAZONAS', ubicacion: 'Amazonas' },
        { value: 'ANTIOQUIA', ubicacion: 'Antioquia' },
        { value: 'ARAUCA', ubicacion: 'Arauca' },
        { value: 'SAN%20ANDRES', ubicacion: 'San Andres' },
        { value: 'ATLANTICO', ubicacion: 'Atlantico' },
        { value: 'BOGOTA%20D.C.', ubicacion: 'Bogotá' },
        { value: 'BOLIVAR', ubicacion: 'Bolivar' },
        { value: 'BOYACA', ubicacion: 'Boyacá' },
        { value: 'CALDAS', ubicacion: 'Caldas' },
        { value: 'CAQUETA', ubicacion: 'Caquetá' },
        { value: 'CASANARE', ubicacion: 'Casanare' },
        { value: 'CAUCA', ubicacion: 'Cauca' },
        { value: 'CESAR', ubicacion: 'Cesar' },
        { value: 'CHOCO', ubicacion: 'Chocó' },
        { value: 'CORDOBA', ubicacion: 'Córdoba' },
        { value: 'CUNDINAMARCA', ubicacion: 'Cundinamarca' },
        { value: 'GUINIA', ubicacion: 'Guainía' },
        { value: 'GUAVIARE', ubicacion: 'Guaviare' },
        { value: 'HUILA', ubicacion: 'Huila' },
        { value: 'LA%20GUAJIRA', ubicacion: 'La Guajira' },
        { value: 'MAGDALENA', ubicacion: 'Magdalena' },
        { value: 'META', ubicacion: 'Meta' },
        { value: 'NARINO', ubicacion: 'Nariño' },
        { value: 'NORTE%20DE%20SANTANDER', ubicacion: 'Nte Santander' },
        { value: 'PUTUMAYO', ubicacion: 'Putumayo' },
        { value: 'QUINDIO', ubicacion: 'Quindío' },
        { value: 'RISARALDA', ubicacion: 'Risaralda' },
        { value: 'SANTANDER', ubicacion: 'Santander' },
        { value: 'SUCRE', ubicacion: 'Sucre' },
        { value: 'VALLE%20DEL%20CAUCA', ubicacion: 'Valle del Cauca' },
        { value: 'VAUPES', ubicacion: 'Vaupes' },
        { value: 'VICHADA', ubicacion: 'Vichada' }
    ];
    
    gps: UbicacionInterface = {
        direccion : '',
        detalles : '',
        barrio: '',
        ciudad: '',
        latitud:'',
        longitud : ''
    }

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

    pais: string;
    departamento: any = {};
    ciudad: string;
    tipo: string;
    n1: string;
    n2: string;
    complemento: string;
    detalles: string;
    barrio: string;
    buscado: boolean;
    nobuscado: boolean;
    citys: any = [];
    deptos: any = [];
    ocupado: boolean = false;
    departamentoActive: boolean;
    ciudadActive: boolean = false;
    tipoActive: boolean = false;
    n1Active: boolean = false;
    n2Active: boolean = false;
    complementoActive: boolean = false;
    barrioActive: boolean = false;
    detallesActive: boolean = false;

    pocisionLat;
    pocisionLong;
    btnguardar: boolean = false;

    latitudForm;
    longitudForm;
    

    constructor(
        private modalController: ModalController,
        private toastCtrl: ToastController,
        private alertController: AlertController,
        private loading: LoadingController,
        private nativeGeocoder: NativeGeocoder,
        private menu: MenuController,
        private router: Router,
        public zone: NgZone,
        private geolocation: Geolocation,
        private openNativeSettings: OpenNativeSettings,
        private platform: Platform,
        private api: ApiService,
        private ubistorage: UbicacionStorageService,
    ) { 
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocomplete = { input: '' };
        this.autocompleteItems = [];
    }

    ngOnInit() {
        
    }
    
    ionViewWillEnter(){
        this.menu.enable(false, 'first');
        this.menu.enable(false, 'gateway');
        this.obtenerUbicacion();
        // this.inicio();
    }

    inicio() {
        this.inicial = true;
        this.ingubicacion = false;
        this.detectubicacion = false;
    }

    ingresarubicacion() {
        this.inicial = false;
        this.ingubicacion = true;
        this.detectubicacion = false;
    }

    detectarubicacion() {
        this.mostrarDireccion();
    }

    mostrarDireccion() {
        this.observador = this.geolocation.getCurrentPosition({
            timeout: 5000,
            enableHighAccuracy: true
        })
        .then((data) => {
            console.log( data);
            let latitud_ = data.coords.latitude;
            let longitud_ = data.coords.longitude;
            this.loadMap( latitud_, longitud_ );
            this.inicial = false;
            this.ingubicacion = false;
            this.detectubicacion = true;
        }).catch((error) => {
            console.warn('Error getting location', error);
            this.mostrarMsgUbicacion();
        });
    };

    accederaUbicacion(){
        this.openNativeSettings.open( "locations").then( data => {
            console.log('localización abierta, ' + data);
            this.ionViewWillEnter();
        })
        .catch( error => {
            console.warn('Error', error);
        });
    }

    async mostrarMsgUbicacion() {
        this.inicio();
        const alert = await this.alertController.create({
            backdropDismiss: false,
            translucent: true,
            mode: "ios",
            cssClass: "msgalertagps",
            header: "Vecino, activa la ubicacion o GPS",
            message: "Vecino app clientes necesita usar los servicios de ubicación para buscar las tiendas cerca de ti y puedas realizar tus pedidos.",
            buttons: [
                {
                    text: "Aceptar",
                    cssClass: "msgalertagps_button",
                    handler: () => {
                        this.accederaUbicacion();
                    },
                },
            ],
        });

        alert.present();
    }

    async loader() {
        const loading = await this.loading.create({
            spinner: 'lines-small',
            duration: 3000,
            // message: 'Vecino se está cargando nuevamente!',
            translucent: true,
            mode: 'md',
            cssClass: 'loader',
            backdropDismiss: false
        });
        await loading.present();
        const { role, data } = await loading.onDidDismiss();
        console.log('Loading dismissed with role:', role);
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
                zoomControl: true,
                animation: 'DROP'
            }

            this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            this.map.addListener('tilesloaded', () => {
                this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
                this.lat = this.map.center.lat()
                this.long = this.map.center.lng()
                // this.renderMarkers();

                this.ShowCords( this.lat, this.long );


            });
        }).catch((error) => {
            // console.log('Error al encontrar la direccion', error);
        });
    }

    getAddressFromCoords(lattitude, longitude) {
        let options: NativeGeocoderOptions = {
            useLocale: true,
            // maxResults: 5
            maxResults: 1
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
                console.log(this.address)
            })
            .catch((error: any) => {
                this.address = "Dirección no disponible!";
            });
    }

    ShowCords( lat, long ) {
        // alert('lat' + this.lat + ', long' + this.long)
        this.pocisionLat = lat;
        this.pocisionLong = long;

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
                    mapa.setZoom(15);
                    mapa.setCenter(results[0].geometry.location);
                    const marker = new google.maps.Marker({
                        mapa,
                        position: results[0].geometry.location,
                    });
                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(mapa, marker);
                } else {
                    window.alert("No results found");
                }
            } else {
                window.alert("Geocoder failed due to: " + status);
            }
        });
    }

    // Buscar direccion autocompletando formulario
    geocodePlaceId2(tipo: string, n1: string, n2: string, complemento: string, barrio: string, ciudad: string, departamento: string) {
        let geocoder = new google.maps.Geocoder();
        let infowindow = google.maps.InfoWindow;
        this.address = tipo + " " + n1 + " # " + n2 + " - " + complemento + " " + ciudad + ", " + barrio;
        geocoder.geocode({ address: this.address }, (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    let mapa = this.map;
                    let a = (document.getElementById("latitud") as HTMLTextAreaElement).value = results[0].geometry.location.lat();
                    let b = (document.getElementById("longitud") as HTMLTextAreaElement).value = results[0].geometry.location.lng();

                    this.latitudForm = a;
                    this.longitudForm = b;

                    const marker = new google.maps.Marker({
                        mapa,
                        position: results[0].geometry.location,
                    });
                    this.buscado = true;

                } else {
                    window.alert("No results found");
                }
            } else {
                this.buscado = false;
                this.nobuscado = true;
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

    verdepartamentos(depa) {
        console.log(depa.value)
        this.departamentoActive = true;
        this.departamento = depa.value;
        this.getObtenerCiudades(this.departamento);
        return this.departamento;
    }

    getObtenerCiudades(departamentos) {
        this.api.obtenerCiudades(departamentos).subscribe(data => {
            this.citys = data;
        });
    }

    ciudades(city) {
        this.ciudad = city.value;
        console.log(this.ciudad)
        this.ciudadActive = true;
        return this.ciudad;
    }

    tipos(type) {
        this.tipo = type.value;
        console.log(this.tipo)
        this.tipoActive = true;
        return this.tipo;
    }

    _numero(n_1) {
        this.n1 = n_1.value;
        console.log(this.n1)
        this.n1Active = true;
        return this.n1;
    }

    _numeros(n_2) {
        this.n2 = n_2.value;
        console.log(this.n2)
        this.n2Active = true;
        return this.n2;
    }

    _complemento(comp) {
        this.complemento = comp.value;
        console.log(this.complemento)
        this.complementoActive = true;
        this.detallesActive = true;
        return this.complemento;
    }

    _detalles( detal ){
        this.detalles =detal.value;
        console.log( this.detalles );
        return this.detalles;
    }

    _streets(bar) {
        this.barrio = bar.value;
        console.log(this.barrio)
        this.barrioActive = true;
        this.detallesActive = true;
        return this.barrio;
    }

    buscar() {
        if( this.ciudad == undefined ){
            this.presentToast('Necesitas seleccionar un departamento y una ciudad!', 'warning', "alert-circle-outline");
        }
        else if( this.tipo == undefined ){
            this.presentToast('Necesitas seleccionar un tipo de vía!', 'warning', "alert-circle-outline");
        }
        else if( this.n1 == undefined || this.n1 == "" ){
            this.presentToast('Necesitas ingresar el número de la vía. Ejemplo: 20 Sur --  --  !', 'warning', "alert-circle-outline");
        }
        else if( this.n2 == undefined || this.n2 == "" ){
            this.presentToast('Necesitas ingresar el número del acceso al predio de tu dirección. Ejemplo: -- #23 -- !', 'warning', "alert-circle-outline");
        }
        else if( this.complemento == undefined || this.complemento == "" ){
            this.presentToast('Necesitas ingresar el complemento del acceso al predio en tu dirección. Ejemplo: -- -- 24 !', 'warning', "alert-circle-outline");
        }
        else if( this.barrio == undefined || this.barrio == "" ){
            this.presentToast('Necesitas ingresar el nombre del barrio donde vives!', 'warning', "alert-circle-outline");
        }
        else {
            this.geocodePlaceId2(this.tipo, this.n1, this.n2, this.complemento, this.barrio, this.ciudad, this.departamento);
            // this.presentToast("¡Has llenado los datos de tu ubicación!", "success", "shield-checkmark-circle-outline");
            this.btnguardar = true;
        }
    }

    async presentToast(message: string, color: string, icono: string) {
        const toast = await this.toastCtrl.create({
            message,
            color,
            duration: 3000,
            position: 'top',
            mode: 'ios',
            translucent: false,
            buttons: [
                {
                  side: 'end',
                  icon: icono
                }
            ]
        });
        toast.present();
    }

    guardarubicacioning( ){
        let direccion = this.tipo + ' ' + this.n1 + ' # ' + this.n2 + ' ' + this.complemento + ' ' + this.ciudad + ', ' + this.barrio;
        
        this.newItem.modified = Date.now();
        this.newItem.departamento = this.departamento;
        this.newItem.ciudad = this.ciudad;
        this.newItem.tipo = this.tipo;
        this.newItem.tipon1 = this.n1;
        this.newItem.tipon2 = this.n2;
        this.newItem.complemento = this.complemento;
        this.newItem.detalles = this.detalles;
        this.newItem.barrio = this.barrio;
        this.newItem.latitud = this.latitudForm;
        this.newItem.longitud = this.longitudForm;
        this.newItem.direccion = direccion;

        // console.warn(this.newItem);
        this.ubistorage.addUbicacion(this.newItem).then(item => {
            this.newItem = <UbicacionItem>{};
            this.presentToast( "Has agregado tu ubicación!", "success", 'checkmark-circle-outline' );
            this.router.navigate(["gateway"]);
        });
    }

    guardarubicaciongps( datosdir, datosdeta ){
        let direccion = datosdir.value;
        let detalles = datosdeta.value;

        if ( direccion == "" ) {
            this.presentToast('Necesitas ubicar una direccion en el mapa', 'warning', 'alert');
        }
        if ( detalles == "" ) {
            this.newItem.modified = Date.now();
            this.newItem.direccion = direccion;
            this.newItem.detalles = '-';
            this.newItem.latitud = this.lat;
            this.newItem.longitud = this.long;
        } 
        else {
            this.newItem.modified = Date.now();
            this.newItem.direccion = direccion;
            this.newItem.detalles = detalles;
            this.newItem.latitud = this.lat;
            this.newItem.longitud = this.long;
        }
        console.warn(this.newItem);
        this.ubistorage.addUbicacion(this.newItem).then(item => {
            this.newItem = <UbicacionItem>{};
            this.presentToast( "Has agregado tu ubicación!", "success", 'checkmark-circle-outline' );
            this.router.navigate(["gateway"]);
        });
    }

    obtenerUbicacion() {
        this.ubistorage.getUbicaciones().then( items => {
            // console.log( items);
            if( items) {
                this.router.navigate(["/gateway"]);
            }
            else {
                this.inicio();
            }
        }).catch((error) => {
            console.warn('Error, no hay datos guardados de direccion', error);
        });
    }

}
