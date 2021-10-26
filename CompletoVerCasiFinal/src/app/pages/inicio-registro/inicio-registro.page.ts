import { Component, Input, ViewChild, ElementRef, NgZone } from "@angular/core";
import { Router } from '@angular/router';
import { ApiService } from "../../services/api.service";
import { ToastController, MenuController, IonSlides, IonInput, IonSelect, AlertController } from "@ionic/angular";
import { ModalController } from "@ionic/angular";
import { RegistroInterface } from "../../interfaces/registro.interface";
import { AuthguardService } from "../../services/authguard.service";
import { CacheService } from 'ionic-cache';
import { Location } from '@angular/common';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { PushService } from '../../services/push.service';
import { TerminosPage } from '../../components/terminos/terminos.page';
import { AuthSocialService, User } from "src/app/services/auth-social.service";
import { UbicacionItem, UbicacionStorageService } from '../../services/ubicacion-storage.service'
import { FormBuilder, Validators } from "@angular/forms";
declare var google;

@Component({
    selector: 'app-inicio-registro',
    templateUrl: './inicio-registro.page.html',
    styleUrls: ['./inicio-registro.page.scss'],
})
export class InicioRegistroPage {

    @ViewChild('map', { static: false }) mapElement: ElementRef;
    map = null;
    address: string;
    lat: string;
    long: string;
    // 
    autocomplete: { input: string; };
    autocomplete_lat: { input: string; };
    autocomplete_lng: { input: string; };
    autocompleteItems: any[];
    location: any;
    placeid: any;
    GoogleAutocomplete: any;
    // 

    pais: string;
    departamento: any = {};
    ciudad: string;
    tipo: string;
    n1: string;
    n2: string;
    complemento: string;
    barrio: string;
    buscado: boolean;
    nobuscado: boolean;
    citys: any = [];
    deptos: any = [];
    ocupado: boolean = false;

    // 
    reg: RegistroInterface = {
        nombre: '',
        apellido: '',
        telefono: '',
        rut: '',
        email: '',
        password: '',
        direccion: '',
        tipo: '',
        numero: '',
        complemento: '',
        pais: '',
        ciudad: '',
        latitud: '',
        longitud: ''
    };

    newItem: any;

    // CARDS 
    generales: boolean;
    ubicacion: boolean;
    acceso: boolean;

    clienteUserId;
    // 

    passwordType: string = 'password';
    passwordShow: boolean = false;
    eye: boolean = false;

    departamentoActive: boolean;
    ciudadActive: boolean = false;
    tipoActive: boolean = false;
    n1Active: boolean = false;
    n2Active: boolean = false;
    complementoActive: boolean = false;
    barrioActive: boolean = false;
    detallesActive: boolean = false;
    // 
    // Activo
    activo: boolean;
    modal: boolean;
    email = 'soportealtendero@gmail.com';
    // 

    data = [
        {
            selected: 0
        }
    ]

    data2 = [
        {
            selected: 0
        }
    ]

    user: User

    ubicacionguardada: boolean = false;
    storageDireccion;
    storageDetalles;
    storageDepto;
    storageCiudad;
    storageTipo;
    storageTipoN1;
    storageTipoN2;
    storageBarrio;
    storageLatitud;
    storageLongitud;

    constructor(
        private api: ApiService,
        private router: Router,
        private toastCtrl: ToastController,
        public modalController: ModalController,
        private alertController: AlertController,
        private cache: CacheService,
        private authSession: AuthguardService,
        private geolocation: Geolocation,
        public pushService: PushService,
        private nativeGeocoder: NativeGeocoder,
        private menu: MenuController,
        public zone: NgZone,
        private _location: Location,
        private authSocial: AuthSocialService,
        private ubicastorage: UbicacionStorageService,
        private fb: FormBuilder
        ) {
        this.autocomplete = { input: '' };
        this.autocompleteItems = [];
    }

    // formRegister = this.fb.group({
    //     nombre     : ['', Validators.required],   
    //     apellido   : ['', Validators.required],     
    //     telefono   : ['', Validators.required],     
    //     rut        : [''],
    //     email      : [''],  
    //     password   : [''],     
    //     direccion  : [''],      
    //     tipo       : [''], 
    //     numero     : [''],   
    //     complemento: [''],        
    //     pais       : [''], 
    //     ciudad     : [''],   
    //     latitud    : [''],    
    //     longitud   : [''],     
    // })

    ionViewWillEnter() {
        this.cache.clearAll();
        this.loadMap();
        this.eye = true;
        this.menu.enable(false, 'first');
        this.menu.enable(false, 'gateway');
        this.mostrandoDatosUbicacion();
    }

    ngOnInit() {
        this._generales();
        console.log('acaaaaaaaaaaaaaaa');
        console.log();
        
        
        this.authSocial.getState().subscribe(
            (user: User) => {
                // alert('entro auth social registro')
                // alert(JSON.stringify(user))
                // alert('entro type registro')
                // alert(JSON.stringify(user.type))
                if (user.email) {
                    console.log('entro', user);
                    
                    this.user = user;
                    setTimeout(() => {
                        this.setValues();
                    }, 500);
                }
            }
        )
    }

    setValues() {
        console.log(this.user);
                
        // console.log(this.user);    
        let names: string[] = [];
        if (!this.user.givenName && !this.user.familyName) {
            names = this.user.displayName?.split(' ');
        }
        this.reg.nombre = this.user.givenName? this.user.givenName : names.length > 0? names[0] : '';
        this.reg.apellido = this.user.familyName? this.user.familyName : names.length > 2? names[2]: names.length> 0 ? names[1]: '';
        this.reg.telefono = this.user.phoneNumber;
        this.reg.email = this.user.email;
        this.reg.password = this.user.email;
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

    inicio() {
        this._location.back();
    }

    _generales() {
        this.generales = true;
        this.ubicacion = false;
        this.acceso = false;
    }

    _ubicacion() {
        // Validación del formulario
        
        if( this.reg.nombre  == "" ||  this.reg.nombre == undefined ) {
            this.presentToast("Aún no has llenado tu nombre!", "warning", "alert-circle-outline");
        }
        else if( this.reg.apellido  == "" ||  this.reg.apellido == undefined) {
            this.presentToast("Aún no has llenado tu apellido!", "warning", "alert-circle-outline");
        }
        else if( this.reg.telefono  == "" || this.reg.telefono == undefined ) {
            this.presentToast("Aún no has llenado tu teléfono!", "warning", "alert-circle-outline");
        }
        //else if( this.reg.rut  == "" || this.reg.rut == undefined ) {
        //    this.presentToast("Aún no has llenado tu cédula!", "warning", "alert-circle-outline");
        //}
        //else if( this.reg.nombre != "" && this.reg.apellido != "" && this.reg.telefono != "" && this.reg.rut != "" ) {
        else if( this.reg.nombre != "" && this.reg.apellido != "" && this.reg.telefono != "") {
            this.presentToast("Completaste tus datos generales!", "success", "shield-checkmark-circle-outline");
            this.generales = false;
            this.ubicacion = true;
            this.acceso = false;
        }
    }

    _acceso() {
        this.generales = false;
        this.ubicacion = false;
        this.acceso = true;
    }

    togglePasword() {
        if (this.passwordShow) {
            this.passwordShow = false;
            this.passwordType = 'password';
            this.eye = true;
        }
        else {
            this.passwordShow = true;
            this.passwordType = 'text';
            this.eye = false;
        }
    }

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
            this.geocodePlaceId(this.tipo, this.n1, this.n2, this.complemento, this.barrio, this.ciudad, this.departamento);
            this.presentToast("¡Has llenado los datos de tu ubicación!", "success", "shield-checkmark-circle-outline");
        }
    }

    clearForm() {
        this.buscado = false;
        this.nobuscado = false;
    }

    geocodePlaceId(tipo: string, n1: string, n2: string, complemento: string, barrio: string, ciudad: string, departamento: string) {
        let geocoder = new google.maps.Geocoder();
        let infowindow = google.maps.InfoWindow;
        this.address = tipo + " " + n1 + " # " + n2 + " - " + complemento + " " + ciudad + ", " + barrio;
        geocoder.geocode({ address: this.address }, (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    let mapa = this.map;
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

    mostrandoDatosUbicacion(){
        this.ubicastorage.getUbicaciones().then( items => {
            // console.log( items );
            if( items[0].ciudad == '' ){
                this.storageDireccion = items[0].direccion;
                this.storageDetalles = items[0].detalles;
                this.reg.latitud = items[0].latitud;
                this.reg.longitud = items[0].longitud;
                this.reg.mdetalles = items[0].detalles;
                this.storageLatitud = items[0].latitud;
                this.storageLongitud = items[0].longitud;
                
                this.ubicacionguardada = true;
            }
            else {
                this.storageDireccion = items[0].direccion;
                this.storageDetalles = items[0].detalles;

                this.storageDepto = items[0].departamento;
                this.reg.ciudad = items[0].ciudad;
                this.storageTipo = items[0].tipo;
                this.storageTipoN1 = items[0].tipon1;
                this.storageTipoN2 = items[0].tipon2;
                this.reg.mdetalles = items[0].detalles;
                this.storageBarrio = items[0].barrio;
                this.storageLatitud = items[0].latitud;
                this.storageLongitud = items[0].longitud;

                this.ubicacionguardada = true;
            }
        });
    }

    async eliminarubicacion() {
        const alert = await this.alertController.create({
            backdropDismiss: false,
            translucent: true,
            mode: "ios",
            cssClass: "",
            header: "Eliminar esta ubicación",
            message: "¿Vecino está seguro que quiere eliminar esta ubicación y registrar una nueva?.",
            buttons: [
                {
                    text: "Cancelar",
                    cssClass: "",
                    handler: () => {
                        alert.dismiss();
                    },
                },
                {
                    text: "Aceptar",
                    cssClass: "",
                    handler: () => {
                        this.ubicastorage.vaciarStorage();
                        this.ubicacionguardada = false;
                        alert.dismiss();
                    },
                }
            ],
        });

        alert.present();
    }

    onSubmitRegistro() {
        console.log( this.storageLatitud );
        console.log( this.storageLongitud );

        if (this.reg.nombre == "" || this.reg.nombre == undefined ) {
            this.presentToast("Aún no has llenado tu nombre!", "warning", "alert-circle-outline");
        }
        else if (this.reg.apellido == "" || this.reg.apellido == undefined) {
            this.presentToast("Aún no has llenado tu apellido!", "warning", "alert-circle-outline");
        }
        else if (this.reg.telefono == "" || this.reg.telefono == undefined ) {
            this.presentToast("Aún no has llenado tu telefono!", "warning", "alert-circle-outline");
        }
       
        else if (this.reg.email == "" || this.reg.email == undefined) {
            this.presentToast("Debes indicar tu dirección de correo electrónico!", "warning", "alert-circle-outline");
        }
        else if (this.reg.password == ""  || this.reg.password == undefined || this.reg.password.length < 8 ) {
            this.presentToast("Debes indicar tu contraseña mínimo de 8 carácteres!", "warning", "alert-circle-outline");
        }
        else {
            let version = this.api.version_app;
            let tipo_inicio = 2;
            if (this.user) {
                switch (this.user.type) {
                    case 'Google':
                        tipo_inicio = 0
                        break;
                    case 'Facebook':
                        tipo_inicio = 1
                        break;
                    case 'Apple':
                        tipo_inicio = 3
                        break;                
                    default:
                        break;
                }
                // tipo_inicio = this.user.type == 'Google'? 0 : 1;
            }

            if (this.reg.latitud != "" || this.reg.longitud != "" ) {
                this.presentToast("Debes indicar tu dirección!", "warning", "alert-circle-outline");
                    this.api.postRegistro(this.reg.nombre,   this.reg.apellido, this.reg.telefono, this.reg.rut, this.reg.email, this.reg.password, this.address, "Colombia", this.ciudad, this.reg.mdetalles, this.reg.latitud, this.reg.longitud, version, tipo_inicio)
                    .subscribe((data) => {
                    if (data) {
                        this.presentToast("¡Has creado tu cuenta satisfactoriamente!", "success", "shield-checkmark-circle-outline");
                        this.authSession.addSession(data).then(item => { this.newItem = <any>{}; });
                        this.pushService.filtroUserId(data);
                        this.router.navigate(["/dashboard", data, 'inicio-registro']);
                    }
                });
            }
            else {
                this.api.postRegistro(this.reg.nombre,   this.reg.apellido, this.reg.telefono, this.reg.rut, this.reg.email, this.reg.password, this.storageDireccion, "Colombia", '-', this.storageDetalles, this.storageLatitud, this.storageLongitud, version, tipo_inicio)
                .subscribe((data) => {
                if (data) {
                    this.presentToast("¡Has creado tu cuenta satisfactoriamente!", "success", "shield-checkmark-circle-outline");
                    this.authSession.addSession(data).then(item => { this.newItem = <any>{}; });
                    this.pushService.filtroUserId(data);
                    this.router.navigate(["/dashboard", data, 'inicio-registro']);
                }
            });
            }
        }
    }

    getObtenerCiudades(departamentos) {
        this.api.obtenerCiudades(departamentos).subscribe(data => {
            this.citys = data;
        });
    }

    async verTerminos(item) {
        const modal = await this.modalController.create({
            component: TerminosPage,
            cssClass: 'modal-terminos',
            componentProps: {
                id: 0,
                backdropDismiss: false,
                color: 'light'
            }
        });
        if (item.selected == true) {
            this.activo = true;
        }
        else {
            this.activo = false;
        }
        return await modal.present();
    }

    conociendoRegistro(email) {
        console.log( email.value )
        this.api.conociendoRegistro(email.value).subscribe(data => {
            console.log(data);
            if (data != "") {
                if (JSON.parse(data[0].profilesId) == 2) {
                    this.presentToast('Este email ya se ha registrado como vecino tendero, registra otro diferente!', 'tertiary', 'sad-outline');
                    this.ocupado = true;
                }
                if (JSON.parse(data[0].profilesId) == 3) {
                    this.presentToast('Este email  ya se ha registrado como vecino cliente, registra otro diferente!', 'tertiary', 'sad-outline');
                    this.ocupado = true;
                }
                if (JSON.parse(data[0].profilesId) < 2 || JSON.parse(data[0].profilesId) > 3) {
                    this.presentToast('Este email está disponible!', 'medium', 'happy-outline');
                    this.ocupado = false;
                }
            }
            else {
                this.presentToast('Este email está disponible!', 'medium', 'happy-outline');
                this.ocupado = false;
            }
        });
    }

   


}
