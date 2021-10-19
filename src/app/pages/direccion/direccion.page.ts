import { Component, OnInit, Input, ViewChild, ElementRef, NgZone } from "@angular/core";
import { ModalController, Platform, ToastController, AlertController, IonSegment, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CacheService } from 'ionic-cache';
import { ApiService } from "../../services/api.service";
import { DireccionStorageService, DireccionItem } from '../../services/storage/ubicacion-storage.service';
import { AuthguardService } from "src/app/services/authguard.service";

// Storage de Direcciones - Ubicaciones Guardadas

declare var google;
@Component({
    selector: 'app-direccion',
    templateUrl: './direccion.page.html',
    styleUrls: ['./direccion.page.scss'],
})

export class DireccionPage implements OnInit {
    @ViewChild('map', { static: false }) mapElement: ElementRef;
    address: string;
    lat: string;
    long: string;
    autocomplete: { input: string; };
    autocompleteItems: any[];
    // location: any;
    placeid: any;
    GoogleAutocomplete: any;
    map = null;
    infoWindows: any = [];

    cliente;
    infodirecciones: any = [];
    direccion: any = [];
    // 

    pais: string;
    departamento: string;
    ciudad: string;
    tipo: string;
    n1: string;
    n2: string;
    complemento: string;
    barrio: string;
    detalles: string;
    buscado: boolean;
    nobuscado: boolean;
    _latitud: any;
    _longitud: any;

    longitude;
    latitude;

    act: any = {
        pais: '',
        ciudad: '',
        tipo: '',
        n1: '',
        n2: '',
        complemento: '',
        latitud: '',
        longitud: ''
    };

    citys: any = [];
    deptos: any = [];
    // 

    departamentoActive: boolean;
    ciudadActive: boolean = false;
    tipoActive: boolean = false;
    n1Active: boolean = false;
    n2Active: boolean = false;
    complementoActive: boolean = false;
    barrioActive: boolean = false;
    detallesActive: boolean = false;

    observador;
    ubicaciones: any = [];
    verubicaciones: boolean;
    newubicacion: boolean;
    leyenda: boolean;
    items: DireccionItem[] = [];
    newItem: DireccionItem = <DireccionItem>{};
    nombre_ubicacion: string;
    instrucciones: boolean;
    @ViewChild('ionSegment') ionSegment:IonSegment;

    constructor(
        private router: Router,
        private platform: Platform,
        private modalController: ModalController,
        private alertController: AlertController,
        private toastCtrl: ToastController,
        private route: ActivatedRoute,
        private location: Location,
        public zone: NgZone,
        private geolocation: Geolocation,
        private nativeGeocoder: NativeGeocoder,
        private cache: CacheService,
        private api: ApiService,
        private direccionesStorage: DireccionStorageService,
        private authService: AuthguardService,
        private loadingcontroller: LoadingController
    ) {
        this.cliente = this.route.snapshot.paramMap.get("cliente");
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocomplete = { input: '' };
        this.autocompleteItems = [];
    }

    ngOnInit() { 
        this.obtenerDirecciones();
    }

    ionViewWillEnter() {
        this.cache.clearAll();
        this.mostrarDireccion();
        this.loadMap();
        this.averiguarDireccion();
        this.leyenda = true;
        this.verubicaciones = true;
        this.newubicacion = false;
        this.clearForm();
        this.misDirecciones();
    }

    ionViewWillLeave() {
        this.platform.backButton.subscribe();
        this.cache.clearAll();
    }

    misDirecciones() {
        this.cache.clearAll();
        this.obtenerDirecciones();
        this.leyenda = true;
        this.verubicaciones = true;
        this.newubicacion = false;
    }

    agregar() {
        this.cache.clearAll();
        this.leyenda = true;
        this.verubicaciones = false;
        this.newubicacion = true;
        this.clearForm();
    }

    // ------- Obtener Direcciones Storage  ------------------------------
    obtenerDirecciones() {
        this.cache.clearAll();
        this.api.obtenerDireccionesCliente(this.cliente).subscribe(data => {
            this.ubicaciones = data;
            // console.log(data);
        });
    }

    // ------- Get Direccion ------------------------------
    mostrarDireccion() {
        this.api.obtenerDireccion(this.cliente).subscribe((data) => {
            this.direccion = data;
        });
    }

    // ------- Regresar a pagina anterior ------------------------------
    iraAtras() {
        this.location.back();
    }

    // METODOS DE MAPA Y UBICACION
    loadMap() {
        this.geolocation.getCurrentPosition().then((resp) => {
            let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            let mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            }

            this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            this.map.addListener('tilesloaded', () => {
                this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
                this.lat = this.map.center.lat()
                this.long = this.map.center.lng()
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
    }

    departamentos(depa) {
        // console.log(depa.value)
        this.departamentoActive = true;
        this.departamento = depa.value;
        this.getObtenerCiudades(this.departamento);
        return this.departamento;
    }

    ciudades(city) {
        this.ciudad = city.value;
        // console.log(this.ciudad)
        this.ciudadActive = true;
        return this.ciudad;
    }

    tipos(type) {
        this.tipo = type.value;
        // console.log(this.tipo)
        this.tipoActive = true;
        return this.tipo;
    }

    _numero(n_1) {
        this.n1 = n_1.value;
        // console.log(this.n1)
        this.n1Active = true;
        return this.n1;
    }

    _numeros(n_2) {
        this.n2 = n_2.value;
        // console.log(this.n2)
        this.n2Active = true;
        return this.n2;
    }

    _complemento(comp) {
        this.complemento = comp.value;
        // console.log(this.complemento)
        this.complementoActive = true;
        this.detallesActive = true;
        return this.complemento;
    }

    _streets(bar) {
        this.barrio = bar.value;
        // console.log(this.barrio)
        this.barrioActive = true;
        return this.barrio;
    }

    buscar() {
        if (this.departamento == undefined || this.ciudad == undefined || this.tipo == undefined ||
            this.n1 == undefined || this.n2 == undefined || this.complemento == undefined || this.barrio == undefined) {
            this.presentToast('Necesitas completar todo el formulario!', 'warning');
        }
        else {
            this.geocodePlaceId(this.tipo, this.n1, this.n2, this.complemento, this.barrio, this.ciudad, this.departamento)
        }
    }

    clearForm() {
        this.departamentoActive = false;
        this.ciudadActive = false;
        this.tipoActive = false;
        this.n1Active = false;
        this.n2Active = false;
        this.detallesActive = false;
        this.barrioActive = false;
        this.buscado = false;
    }

    geocodePlaceId(tipo: string, n1: string, n2: string, complemento: string, barrio: string, ciudad: string, departamento: string) {
        let geocoder = new google.maps.Geocoder();
        let infowindow = google.maps.InfoWindow;
        // const placeId = item.place_id;

        this.address = tipo + " " + n1 + " # " + n2 + " - " + complemento + " " + ciudad + ", " + barrio;
        // const address = "diagonal 77h No 71c - 38 bogota bosa";
        // console.log(this.address)

        geocoder.geocode({ address: this.address }, (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    // console.log(results)
                    let mapa = this.map;
                    // mapa.setZoom(15);
                    // mapa.setCenter(results[0].geometry.location);
                    let a = (document.getElementById("latitud") as HTMLTextAreaElement).value = results[0].geometry.location.lat();
                    let b = (document.getElementById("longitud") as HTMLTextAreaElement).value = results[0].geometry.location.lng();
                    const marker = new google.maps.Marker({
                        mapa,
                        position: results[0].geometry.location,
                    });
                    this.buscado = true;

                } else {
                    window.alert("No results found");
                }
            } else {
                // window.alert("Geocoder failed due to: " + status);
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

    async averiguarDireccion() {
        this.observador = this.geolocation.getCurrentPosition().then(data => {
            // console.warn(data);
            this.latitude = data.coords.latitude;
            this.longitude = data.coords.longitude;
        });
    }

    nombredireccion( nom ){
        this.nombre_ubicacion = nom;
        return this.nombre_ubicacion;
    }

    agregarDireccion(dep, ciu, tip, num, nume, com, mde, bar) {
        this.departamento = dep.value;
        this.ciudad = ciu.value;
        this.tipo = tip.value;
        this.pais = "Colombia";
        this.n1 = num;
        this.n2 = nume;
        this.complemento = com;
        this.barrio = bar;
        this.detalles = mde.value
        this._latitud = this.latitude;
        this._longitud = this.longitude;   
        this.notificacionLoaderDireccion();

        if( this.detalles == "" || this.detalles == undefined ){
            this.api.postaddnuevadireccioncliente(this.pais, this.ciudad, this.address, '-', this._latitud, this._longitud, this.cliente, this.nombre_ubicacion).subscribe(data => {
                if (data) {
                    this.presentToast('Vecino, has guardado una nueva direccion', 'success');
                    this.loadingcontroller.dismiss();
                    this.ionSegment.value = '1';
                    this.ionViewWillEnter();
                }
            });
        }
        else {
            this.api.postaddnuevadireccioncliente(this.pais, this.ciudad, this.address, this.detalles, this._latitud, this._longitud, this.cliente, this.nombre_ubicacion).subscribe(data => {
                if (data) {
                    this.presentToast('Vecino, has guardado una nueva direccion', 'success');
                    this.loadingcontroller.dismiss();
                    this.ionSegment.value = '1';
                    this.ionViewWillEnter();
                }
            });
        }
    }


    //  Aplicar Direccion del Storage y Actualizarla Automaticamente
    aplicarDireccion(codigo) {
        this.api.activarnuevadireccion(codigo, this.cliente).subscribe(data => {
            // console.log(data);
        });
        this.notificacionLoaderDireccion();
        this.agregar(); // Al recargar este ionsegment y luego volver a mostrar las direcciones y a su vez hacia ionviewwillenter, 
        //se muestran realmente las direcciones aplicadas. Por favor no mover, o notificar el cambio.
        this.misDirecciones();
        
        setTimeout(() => {
            this.presentToast('Vecino, esta dirección ha sido activada', 'success');
            this.loadingcontroller.dismiss();
            this.ionViewWillEnter();
            this.misDirecciones();
        }, 2000);


    }
    

    // Eliminar una Ubicacion del Storage
    async eliminarUbicacion(codigo) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Eliminar Dirección',
            message: 'Vas a eliminar esta dirección de tu lista de ubicaciones guardadas, esta operación no se puede deshacer.',
            mode: 'ios',
            buttons: [
                {
                    text: 'No',
                    handler: () => {
                        this.alertController.dismiss();
                    }
                },
                {
                    text: 'Si',
                    handler: () => {
                        this.api.eliminardireccioncliente(codigo).subscribe(data => {
                            this.presentToast('Vecino, la dirección se ha eliminado exitosamente', 'danger');
                            this.ionViewWillEnter();
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    getObtenerCiudades(departamentos) {
        this.api.obtenerCiudades(departamentos).subscribe(data => {
            this.citys = data;
        });
    }

    async presentToast(message: string, color: string) {
        const toast = await this.toastCtrl.create({
            message,
            color,
            duration: 2000,
            translucent: false,
            mode: 'ios',
            position: 'top'
        });
        toast.present();
    }

    async notificacionLoaderDireccion(){
        const loading = await this.loadingcontroller.create({
            cssClass: 'loader-pedido',
            message: 'Estamos guardando la ubicación nueva, este proceso puede durar un poco, por favor espera.',
            translucent: true,
            mode: "md",
            backdropDismiss: false
        });
        await loading.present();
    }
}
