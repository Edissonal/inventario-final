import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, IonSlides, MenuController, ModalController, Platform, ToastController, LoadingController } from '@ionic/angular';
import { interval, Subscription } from 'rxjs';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { timeout } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { ValoresStorageService } from '../../services/valores-storage.service';
import { TerminosPage } from '../../components/terminos/terminos.page';
import { CacheService } from 'ionic-cache';



@Component({
    selector: 'app-gateway',
    templateUrl: './gateway.page.html',
    styleUrls: ['./gateway.page.scss'],
})
export class GatewayPage implements OnInit {
    private subscription: Subscription;
    @ViewChild("slideWithNav2", { static: false }) slideWithNav2: IonSlides;
    @ViewChild('slides') slides: IonSlides;




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

    latitudcliente;
    longitudcliente;
    cdn_site = "https://cdn.vecino.com.co/";
    cliente = 'gateway' + 1;
    sumaTotal = 0;
    observador = null;
    sliderTwo: any;
    suma: number;
    total: number;
    red: boolean;
    tiendas_cercanas: any = [];
    cercanas: any = [];
    categorias: any = [];
    categoriasart: any = [];
    imagenes: any = [];
    sugerencias: any = [];
    promociones: any = [];
    pedidos: any = [];
    valores: any = [];
    informacion: any = [];
    direccion: any = [];
    productos: any = [];
    productoscercanos: any = [];
    tenderos: any = [];
    productoscerca: any = [];
    //Busqueda Tiendas
    resultados: any = [];
    codCategoria;
    view: boolean;
    busqueda1: boolean;

    listatenderos: boolean = false;
    noitems: boolean = false;

    //--------------
    
    diaHoy = new Date();
    nomenclaturadia: any;
    valor: boolean = false;
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
        private cache: CacheService,
        private toast: ToastController
    ) {
        this.sliderTwo = {
            isBeginningSlide: true,
            isEndSlide: true,
        };
    }

    ngOnInit() { 
        
    }

    //implementacion slides pantalla completa

    goToSlide(termino) {
        this.slides.slideTo(termino, 500);
    
      }

    ionViewWillEnter() {
        this.cache.clearAll();
        this.mostrarDireccionCliente();
        this.obteniendoTotal();
        this.mostrarcategorias();
        this.mostrarcategoriasArt();
        this.suma = 0;
        this.menu.enable(true, 'gateway');
        this.menu.enable(false, 'first');
        //nuevos
        this.view = true;
        this.nomenclaturadia = this.obtenerDia( this.diaHoy.getDay());
    }

    ionViewDidLeave() {
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

    // ---- Mostrar Informacion ---------------------------------------------------------------
    mostrarcategorias() {
        this.api.obtenernewCateTiendas().subscribe(data => {
            this.categorias = data;
            // console.warn(data)
        });
    }

    mostrarcategoriasArt() {
        this.api.obtenerCategoriasArt().subscribe(data => {
            this.categoriasart = data;
           // console.log(this.categoriasart);
            // console.warn(data)
        });
    }

    mostrarDireccionCliente() {
        this.observador = this.geolocation.getCurrentPosition({
            // timeout: 5000,
            // enableHighAccuracy: true
        }).then((data) => {
            this.latitudcliente = data.coords.latitude;
            this.longitudcliente = data.coords.longitude;
            this.obtenerTiendasCercanas(JSON.parse(this.latitudcliente), JSON.parse(this.longitudcliente));
            this.obtenerProductosCercanas(JSON.parse(this.latitudcliente), JSON.parse(this.longitudcliente));
        }).catch((error) => {
            console.warn('Error getting location', error);
            // this.mostrarMsgUbicacion();
        });
    };

    obtenerTiendasCercanas(latcliente, loncliente) {

        this.api.obtenerTiendasCercanas_Dashboard120(latcliente, loncliente).subscribe(data => {
            console.log(data)
            if (data == '') {
                this.mostrarMsgSintiendascercanas();
            }
            else {
                this.cercanas = data;
                console.log(data);
            }
        });
    }

    obtenerProductosCercanas(latcliente, loncliente) {
        this.api.obtenerProductosCercanos_Dashboard(latcliente, loncliente).subscribe(data => {
            if (data == '') {
                // this.mostrarMsgSintiendascercanas();
            }
            else {
                this.productoscercanos = data;
                console.log(data);
            }
        });
    }

    // ---- Ver canasta ----------------------------------------------------------------------
    verCanasta() {
        this.router.navigate(["/gateway-canasta"]);
    }

    // ---- Ver sitios ----------------------------------------------------------------------
    verSitios() {
        this.router.navigate(["/gateway-sitios"]);
    }

    // ---- Ver Direccion ----------------------------------------------------------------------
    verDireccion() {
        this.router.navigate(["/direccion", this.cliente]);
    }

    // ---- Ver pedidos ----------------------------------------------------------------------
    verPedidos() {
        this.router.navigate(["/pedido-detalles", this.cliente]);
    }

    // ---- Busqueda -------------------------------------------------------------------------
    busqueda() {
        this.router.navigate(["/gateway-busqueda/"]);
    }

    verSugerencias() {
        this.router.navigate(["/gateway-productos/", this.cliente]);
    }

    verCercano() {
        this.router.navigate(["/gateway-categorias/", this.cliente]);
    }

    // ---- Ver Tiendas segun la categoria -------------------------------------------------------------------------
    verCategoria(codigo) {
        // this.router.navigate(["/tiendas/", this.cliente, codigo]);
        this.router.navigate(["/gateway-tiendas/", codigo]);
    }

    // ---- Ir a tienda ---------------------------------------------------------------

    iraPromocion(codigo, idtienda, userIdTendero) {
        this.router.navigate(["/gateway-promociones-detalles", codigo, idtienda, userIdTendero]);
    }

    iraProducto(codproducto, codtendero, letrero) {
        if (letrero == "abierto") {
            this.router.navigate(["/gateway-productos-detalle", codproducto, codtendero]);
        }
        else {
            this.presentToast('La tienda que ofrece este producto está cerrada, vuelve mañana', 'danger', 3000, 'top');
        }
    }

    iraTienda(cod_tendero, letrero) {
        if (letrero == "abierto") {
            this.router.navigate(["/gateway-categorias", cod_tendero]);
        }
        else {
            this.presentToast('Esta tienda está cerrada, vuelve mañana', 'danger', 3000, 'top');
        }
    }


    async loader() {
        const loading = await this.loading.create({
            spinner: 'lines-small',
            duration: 3000,
            message: 'Buscando tiendas cercanas',
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
            backdropDismiss: true,
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


    async obteniendoTotal() {
        await this.valoresStorage.getValores().then(items => {
            this.valores = items;
            // console.log(this.valores)

            if (this.valores === null) {
                // return this.suma == 0;
            }

            else if (this.valores == 1) {
                this.suma = this.valores.cantidadCompra * this.valores.precioCompra;
                // return this.suma;
            }

            else {
                for (var i = 0; i < this.valores.length; i++) {
                    this.suma += this.valores[i].cantidadCompra * this.valores[i].precioCompra;
                }
                return this.suma;
            }
        });
    }

    async mostrarDocActionSheet() {
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

    /* ##########################
    #               SLIDERS
    ###########################*/
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
        this.presentToast('Está tienda está cerrada, vuelve mañana!', 'danger', 3000, 'top');
    }

    buscador(busqueda1) {
        let buscar = busqueda1.value;
        //console.log('datos1',buscar);
        //console.log('latitud: '+this.latitudcliente);
        //console.log('longitud: '+this.longitudcliente);
        if (buscar == '') {
            this.view = true; //falta el viewwillenter
            //this.mostrarTenderos2( this.codCategoria )
        }
        else {
            //console.log("Buscando... " + buscar);
            this.view = false;
            this.busqueda1 = true;

            this.api.obtenerTiendaBusqueda(buscar, this.latitudcliente, this.longitudcliente).subscribe(data => {
                // console.log(buscar)
                // console.log(this.latitudcliente)
                // console.log(this.longitudcliente)

                this.resultados = data;
                // console.warn(data);
                //console.log('devuelve',data);
            });
        }
    }


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

    async resta() {
        const alert = await this.alertController.create({
            // backdropDismiss: false,
            cssClass: "my-custom-class",
            mode: "ios",
            header: "No ahi",
            message: "Restaurantes no disponibles",
            buttons: [
                {
                    text: "Aceptar",
                    cssClass: "primary",
                },
            ],
        });

        alert.present();
    }
    

}
