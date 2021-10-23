import { CacheService } from 'ionic-cache';
import { Component, OnInit, ViewChild } from "@angular/core";
import { IonSlides, AlertController, ToastController, Platform, ActionSheetController, ModalController, MenuController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute, Params, RouterEvent, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from "../../services/api.service";
import { ValoresStorageService } from "../../services/valores-storage.service";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TerminosPage } from '../../components/terminos/terminos.page';
import { Subscription, interval } from 'rxjs';
import * as $ from 'jquery';
import { ChatPage } from "../chat/chat.page";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.page.html",
    styleUrls: ["./dashboard.page.scss"],
})

export class DashboardPage implements OnInit {
    private subscription: Subscription;
    @ViewChild("slideWithNav2", { static: false }) slideWithNav2: IonSlides;
    private previousUrl: string = undefined;
    private currentUrl: string = undefined;

    slideOptsBanner = {
        initialSlide: 0,
        slidesPerView: 1,
        autoplay: true,
        speed: 400
    };
    slideOptsCategoriasArt = {
        initialSlide: 0,
        autoplay: true,
        speed: 400,
        slidesPerView: 4,
        centeredSlides: false,
        spaceBetween: 30
    };
    slideOptsPromociones = {
        initialSlide: 1,
        slidesPerView: 2,
        loop: true,
        centeredSlides: true,
        spaceBetween: 10,
    };
    slideOptsCategorias = {
        initialSlide: 0,
        slidesPerView: 3,
        loop: false,
        centeredSlides: false,
        spaceBetween: 0,
    };
    slideOptsSugerencias = {
        initialSlide: 1,
        slidesPerView: 2,
        loop: true,
        centeredSlides: true,
        spaceBetween: 3,
    };
    slideOptsCercanos = {
        initialSlide: 1,
        slidesPerView: 2,
        loop: true,
        centeredSlides: true,
        spaceBetween: 10,
    };
    slideOptsExclusivo = {
        initialSlide: 1,
        slidesPerView: 2,
        loop: true,
        centeredSlides: true,
        spaceBetween: 10,
    };

    cdn_site = "https://cdn.vecino.com.co/";
    cliente;
    rutaanterior;
    latitudcliente;
    longitudcliente;
    latituddispositivo;
    longituddispositivo;
    observador = null;
    suma = 0;
    sumaTotal = 0;
    sliderTwo: any;
    cercanas: any = [];
    categorias: any = [];
    categoriasart: any = [];
    sugerencias: any = [];
    valores: any = [];
    informacion: any = [];
    direccion: any = [];
    detalles: any = [];
    sitios_cercanos: any = [];
    productos: any = [];
    productoscercanos: any = [];
    tenderos: any = [];
    nombrecliente: any = [];
    //Busqueda Tiendas
    resultados: any = [];
    codCategoria;
    view: boolean;
    busqueda1: boolean;
    listatenderos: boolean = false;
    noitems: boolean = false;

    //----------------------------

    total: number;
    latitude: any = 0; //latitude
    longitude: any = 0; //longitude

    busquedas:any = [];
    
    diaHoy = new Date();
    nomenclaturadia:any;
    constructor(
        private api: ApiService,
        private valoresStorage: ValoresStorageService,
        private router: Router,
        private route: ActivatedRoute,
        private alertController: AlertController,
        private actionSheetController: ActionSheetController,
        private platform: Platform,
        private geolocation: Geolocation,
        private modalController: ModalController,
        private menu: MenuController,
        private toastCtrl: ToastController,
        private loading: LoadingController,
        private location: Location,
        private cache: CacheService,
        private toast: ToastController
    ) {
        this.cliente = this.route.snapshot.paramMap.get("cliente");
        this.rutaanterior = this.route.snapshot.paramMap.get("prev");

        this.sliderTwo = {
            isBeginningSlide: true,
            isEndSlide: true,
        };
    }

    ngOnInit() {
        this.ActivarGps();
    }

    ionViewWillEnter() {
        // if (this.rutaanterior  == "prev") {
        //     this.platform.backButton.subscribeWithPriority(9999, () => {
        //         navigator['app'].exitApp();
        //     });
        // }
        // else {
        //     this.conocerRutaAnterior();
        // }

        this.menu.enable(true, 'first');
        this.menu.enable(false, 'gateway');
        this.mostrarDireccionCliente();
        this.mostrarcategorias();
        this.mostrarcategoriasArt();
        this.mostrarsugerencias();
        this.mostrarInformacionT();
        this.suma = 0;
        this.sumaTotal = 0;
        this.subscription = interval(1000).subscribe();
        this.subscription.unsubscribe();
        this.conocerRutaAnterior();
        this.obteniendoTotal();
        //nuevos
        this.view = true;
        this.nomenclaturadia = this.obtenerDia( this.diaHoy.getDay());

    }

    ionViewDidLeave() {
        this.cache.clearAll();
        this.observador = null;
    }

    slidesDidLoad(slides: IonSlides) {
        slides.startAutoplay();
    }

    obtenerDia( index ){
        let dia = new Array(7);
        dia[0] = "Domingo";
        dia[1] = "Lunes";
        dia[2] = "Martes";
        dia[3] = "Miércoles";
        dia[4] = "Jueves";
        dia[5] = "Viernes";
        dia[6] = "Sábado";
        return dia[index];
    }

    ActivarGps() {
        this.observador = this.geolocation.getCurrentPosition({
            timeout: 5000,
            enableHighAccuracy: true
        }).then((data) => {
            this.latitude = data.coords.latitude; // Latitud BD
            this.longitude = data.coords.longitude; // Longitud BD
        }).catch((error) => {
            if (this.latitude == null || this.latitude == '' || this.longitude == null || this.longitude == '' || this.longitude == '0' || this.longitude == '0' || this.longitude == 0 || this.longitude == 0) {
                this.mostrarMsgUbicacion();
                //console.log('no hay direccion',this.latitude,this.longitude)
            }
            //this.mostrarMsgUbicacion();

        });
    }
    async averiguarDireccion(data_cli1, data_cli2) {
        this.observador = this.geolocation.getCurrentPosition({
            timeout: 5000,
            enableHighAccuracy: true
        }).then((data) => {
            // console.warn(data);
            this.latitude = data.coords.latitude; // Latitud BD
            this.longitude = data.coords.longitude; // Longitud BD

            /*if(this.latitude == null || this.latitude == '' || this.longitude == null || this.longitude == '' ){
                this.mostrarMsgUbicacion(); 
            } */

            let lati = data_cli1 + 0.0090;
            let long = data_cli2 - 0.0090;
            this.calculateDistance(this.latitude, this.longitude, data_cli1, data_cli2);
            this.total = this.calculateDistance(data_cli2, this.longitude, data_cli1, this.latitude);
            //console.log('total:',this.total)
            // SI la distancia esta entre 0 y <= 0.6000 metros
            let distanciamin = 0;
            let distanciamax = 900000;
            if (this.total == distanciamin && this.total <= distanciamax) {
                // console.warn(x)
            }
            else {
                this.mostrarAlertaDireccionDistintaActionSheet();
            }


        }).catch((error) => {
            // console.warn('Error getting location', error);
            //  this.mostrarMsgUbicacion();
        });
    }

    calculateDistance(lon1, lon2, lat1, lat2) {
        let p = 0.017453292519943295; // PI / 180
        let c = Math.cos;
        let a = 0.5 - c((lat1 - lat2) * p) / 2 + c(lat2 * p) * c((lat1) * p) * (1 - c(((lon1 - lon2) * p))) / 2;
        let dis = (12742 * Math.asin(Math.sqrt(a)));
        return Math.trunc(dis);
    }

    mostrarDireccionCliente() {
        this.api.obtenerDireccion(this.cliente).subscribe(data => {
            this.latitudcliente = JSON.parse(data[0].latitud);
            this.longitudcliente = JSON.parse(data[0].longitud);


            this.averiguarDireccion(this.latitudcliente, this.longitudcliente);
            this.obtenerTiendasCercanas(JSON.parse(this.latitudcliente), JSON.parse(this.longitudcliente));
            this.obtenerProductosCercanas(JSON.parse(this.latitudcliente), JSON.parse(this.longitudcliente));
        });
    }

    obtenerTiendasCercanas(latcliente, loncliente) {
        this.api.obtenerTiendasCercanas_Dashboard120(latcliente, loncliente).subscribe(data => {
            if (data == '') {
                // this.mostrarMsgSintiendascercanas();
            }
            else {
                this.cercanas = data;
                // console.log( this.cercanas );
            }
        });
    }

    obtenerProductosCercanas(latcliente, loncliente) {
        this.api.obtenerProductosCercanos_Dashboard(latcliente, loncliente).subscribe(data => {
            if (data == '') {

            }
            else {
                this.productoscercanos = data;
                // console.log( this.productoscercanos );
            }
        });
    }

    // ---- Mostrar Informacion ---------------------------------------------------------------
    mostrarcategorias() {
        this.api.obtenernewCateTiendas().subscribe(data => {
            this.categorias = data;
        });
    }

    mostrarcategoriasArt() {
        this.api.obtenerCategoriasArt().subscribe(data => {
            this.categoriasart = data;
            // console.warn(data)
        });
    }

    mostrarsugerencias() {
        this.api.obtenerArticulos().subscribe(data => {
            this.sugerencias = data;
        });
    }

    mostrarInformacionT() {
        this.api.obtenerInfoCliente(this.cliente).subscribe(data => {
            this.informacion = data;
            // console.log(this.informacion);
            this.direccion = this.informacion[0].direccion;
            this.detalles = this.informacion[0].detalles;
            this.nombrecliente = this.informacion[0].nombre;
        });
    }


    // ---- Ver canasta ----------------------------------------------------------------------
    verCanasta() {
        this.router.navigate(["/canasta", this.cliente]);
    }

    // ---- Ver sitios ----------------------------------------------------------------------
    verSitios(direccion) {
        this.router.navigate(["/sitios", direccion]);
    }

    // ---- Ver Direccion ----------------------------------------------------------------------
    verDireccion() {
        this.router.navigate(["/direccion", this.cliente]);
    }

    // ---- Ver pedidos ----------------------------------------------------------------------
    verPedidos() {
        this.router.navigate(["/pedido-detalles", this.cliente]);
    }

    //------- Ver pedidos historico -----------------------------------------------------------
    verPedidosT() {
        this.router.navigate(["/pedido-historico", this.cliente]);
    }

    // ---- Busqueda -------------------------------------------------------------------------
    busqueda() {
        this.router.navigate(["/busqueda/", this.cliente]);
    }

    verSugerencias() {
        this.router.navigate(["/busqueda/", this.cliente]);
    }

    verCercano() {
        this.router.navigate(["/busqueda/", this.cliente]);
    }

    // ---- Ver Tiendas segun la categoria -------------------------------------------------------------------------
    verCategoria(codigo) {
        this.router.navigate(["/tiendas/", this.cliente, codigo]);
    }

    // ---- Ir a tienda ---------------------------------------------------------------

    iraProducto(cod_producto, cod_tendero, userid, letrero) {

        if (letrero == "abierto") {
            this.router.navigate(["/producto-detalles", this.cliente, cod_producto, cod_tendero, userid]);
        }
        else {
            this.presentToast('La tienda que ofrece este producto está cerrada, vuelve mañana', 'danger', 3000, 'top');
        }
    }

    iraTienda(cod_tendero, letrero) {
        if (letrero == "abierto") {
            this.router.navigate(["/categorias", this.cliente, cod_tendero]);
        }
        else {
            this.presentToast('Esta tienda está cerrada, vuelve mañana', 'danger', 3000, 'top');
        }
    }



    // ---- Canasta--------------------------------------------------------------- 
    obteniendoTotal() {
        this.valoresStorage.getValores().then(items => {
            this.valores = items;
            // console.log(items);

            if (this.valores == null) {
                return this.suma == 0;
            }

            else {
                for (var i = 0; i < this.valores.length; i++) {
                    this.suma += this.valores[i].cantidadCompra * this.valores[i].precioCompra;
                }

                this.sumaTotal = this.suma;
                // console.log(this.sumaTotal)
                // 
                if (this.rutaanterior == "inicio-login") {
                    if (this.sumaTotal > 0) {
                        this.presentToast("¡Continúa con tu compra!", "success", 2000, 'bottom');
                        this.router.navigate(["/canasta", this.cliente]);
                    }
                }
                if (this.rutaanterior == "inicio-registro") {
                    if (this.sumaTotal > 0) {
                        this.presentToast("¡Continúa con tu compra!", "success", 2000, 'bottom');
                        this.router.navigate(["/canasta", this.cliente]);
                    }
                }
                // 
                // return this.sumaTotal;
                return this.suma;

            }
        });
    }

    conocerRutaAnterior() {
        console.warn(this.rutaanterior);
    }

    // ---- Eventos del Slider --------------------------------------------------------------- 
    slideNext(object, slideView) {
        slideView.slideNext(500).then(() => {
            this.checkIfNavDisabled(object, slideView);
        });
    }

    slidePrev(object, slideView) {
        slideView.slidePrev(500).then(() => {
            this.checkIfNavDisabled(object, slideView);
        });
    }

    SlideDidChange(object, slideView) {
        this.checkIfNavDisabled(object, slideView);
    }

    checkIfNavDisabled(object, slideView) {
        this.checkisBeginning(object, slideView);
        this.checkisEnd(object, slideView);
    }

    checkisBeginning(object, slideView) {
        slideView.isBeginning().then((istrue) => {
            object.isBeginningSlide = istrue;
        });
    }

    checkisEnd(object, slideView) {
        slideView.isEnd().then((istrue) => {
            object.isEndSlide = istrue;
        });
    }

    // ---- Ultimos Metodos - Notificaciones -------------------------------------------------------------------------
    async mostrarAlertaDireccionDistintaActionSheet() {
        const alert = await this.alertController.create({
           // backdropDismiss: false,
            cssClass: "my-custom-class",
            header: "Vecino, su dirección es distinta",
            message: "Por favor, actualice su dirección, su barrio y su ubicación",
            buttons: [
                {
                    text: "Aceptar",
                    cssClass: "primary",
                    handler: () => {
                        this.verDireccion();
                    },
                },
            ],
        });

        alert.present();
    }

    async terminos() {
        // console.log( "terminos"); 
        const modal = await this.modalController.create({
            component: TerminosPage,
            cssClass: 'modal-terminos',
            componentProps: {
                id: 0,
                backdropDismiss: false,
                color: 'light'
            }
        });
        return await modal.present();
    }

    // ---- Cerrar Sesion -------------------------------------------------------------------------
    async presentToast(message: string, color: string, duration: number, position: any) {
        const toast = await this.toastCtrl.create({
            message,
            color,
            duration,
            position,
            mode: "ios"
        });
        toast.present();
    }

    async alertSalir() {
        const alert = await this.alertController.create({
            cssClass: "my-custom-class",
            header: "Cerrar Sesión",
            message: "¿Vecino, de verdad vas a salir?",
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
                        this.router.navigate(["/"]);
                        this.presentToast("¡Has cerrado sesión!", "danger", 2000, 'bottom');
                    },
                },
            ],
        });

        alert.present();
    }

    async loader() {
        const loading = await this.loading.create({
            spinner: 'dots',
            duration: 3000,
            message: 'Buscando tiendas cercanas!',
            translucent: true,
            mode: 'md',
            cssClass: 'loader',
            backdropDismiss: false
        });
        await loading.present();
        const { role, data } = await loading.onDidDismiss();
        // console.log('Loading dismissed with role:', role);
    }

    async mostrarMsgUbicacion() {
        const alert = await this.alertController.create({
            backdropDismiss: false,
            translucent: true,
            mode: "ios",
            cssClass: "my-custom-class",
            header: "Vecino, activa la ubicacion o GPS",
            message: "Por favor activa la ubicacion en tu dispositivo, te ubicaremos tus tiendas cercanas",
            buttons: [
                {
                    text: "Aceptar",
                    cssClass: "primary",
                    handler: () => {
                        this.loader();
                        this.ionViewWillEnter();
                    },
                },
            ],
        });
        alert.present();
    }

    async mostrarMsgSintiendascercanas() {
        const alert = await this.alertController.create({
            // backdropDismiss: true,
            translucent: true,
            mode: "ios",
            cssClass: "my-custom-class",
            header: "Vecino, no hay tiendas cercanas",
            message: "Vecino, aun no hay tiendas cercanas  a tu ubicación, invita a tu tendero vecino a registrarse en vecino app Tenderos para que le puedas realizar pedidos a su tienda",
            buttons: [
                {
                    text: "Aceptar",
                    cssClass: "primary",
                    handler: () => {
                    },
                },
            ],
        });

        alert.present();
    }

    cerrarApp() {
        this.alertSalir();
        this.api.postclose(this.cliente).subscribe(data => {
        });
    }

    //  ----------------------------------   Busqueda tiendas      ----------------------

    verTienda(codigo, letrero) {
        if (letrero == 'sin establecer' || letrero == 'cerrado') {
            // console.log(false);
            this.verTiendacerrada();
        }
        else {
            this.router.navigate(["/categorias", this.cliente, codigo]);
            // this.router.navigate(["/categoriasarticulos", this.cliente, codigo]);
        }
    }
    verTiendacerrada() {
        this.PresentToast('Está tienda está cerrada, vuelve mañana!', 'danger');
    }

    buscador(busqueda1) {
        const buscar = busqueda1.value;
        //console.log('datos1',buscar);
        //console.log('latitud: '+this.latitudcliente);
        //console.log('longitud: '+this.longitudcliente);
        if (buscar == '') {
            this.view = true; //falta el viewwillenter
            //this.mostrarTenderos2( this.codCategoria )
        }
        else {

            console.log("Buscando... " + buscar);
            this.view = false;
            this.busqueda1 = true;

            this.busquedas.pop( );
            this.busquedas.push( buscar );

            this.api.obtenerTiendaBusqueda(this.busquedas, this.latitudcliente, this.longitudcliente).subscribe(data => {
                this.resultados = data;
                console.warn(data);
                //console.log('devuelve',data);
            });
        }
    }


    async PresentToast(message: string, color: string) {
        const toast = await this.toast.create({
            message,
            color,
            duration: 2000,
            translucent: false,
            position: 'top'
        });
        toast.present();
    }
}
