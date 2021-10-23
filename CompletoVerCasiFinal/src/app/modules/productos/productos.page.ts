import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IonContent, IonSlides, IonVirtualScroll, LoadingController, ModalController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { DatePipe, Location } from '@angular/common';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CacheService } from 'ionic-cache';
import { ValoresStorageService } from '../../services/valores-storage.service';
import { ComprasStorageService } from '../../services/compras-storage.service';
import { AuthguardService } from '../../services/authguard.service';
import * as $ from 'jquery';

@Component({
    selector: 'app-productos',
    templateUrl: './productos.page.html',
    styleUrls: ['./productos.page.scss'],
})

export class ProductosPage implements OnInit {

    @ViewChild('content') private content: IonContent;
    subCategoryValue: string = "";
    cdn_site = "https://cdn.vecino.com.co/";
    tienda;
    cliente;
    codcategoriaseleccionada;
    nombrecategoriaseleccionada;

    tenderos = [];
    articulos: any = [];
    direccion: any = [];
    productos: any = [];
    categoriasarticulos: any = [];
    subcategoriasarticulos: any = [];
    imagenes: any = [];
    valores: any = [];
    items: any = [];
    productossubcategorias: any = [];
    promociones: any = [];

    // 
    suma: number;
    // 
    sliderMenuVariantes: any;
    sliderProductos: any;
    sliderTwo: any;
    slider_variantes: any = [];
    slider_articulos: any;

    @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;

    slideOptsMVariantes = {
        initialSlide: 1,
        slidesPerView: 4,
        loop: false,
        centeredSlides: true
    };

    slideOptsArticulos = {
        initialSlide: 1,
        slidesPerView: 2,
        loop: true,
        centeredSlides: true,
        spaceBetween: 10,
    };

    // 
    todos: boolean;
    select: boolean;
    userIdTendero: any = [];

    view: boolean;
    resultados: any = [];
    busqueda: boolean;

    // ----
    logs: String[] = [];
    latitude: any = 0; //latitude
    longitude: any = 0; //longitude
    address: string;
    red: boolean;
    // ----

    dia;
    hora;
    cerrado: boolean;

    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    totalItems: number;
    page: number;
    previousPage: number;
    showPagination: boolean;
    loading;
    public pages: number = 1;
    public pagescategorias: number = 1;
    public pagesresultados: number = 1;
    valuescategorias;
    nomcategoria: any;
    noproductoscategoria: boolean = false;

    @ViewChild(IonInfiniteScroll) IonInfiniteScroll: IonInfiniteScroll;

    subcategoriafirst;
    nombresubcategoriafirst;
    subcateg: boolean = true;
    nombretienda;
    fototienda;

    constructor(
        private api: ApiService,
        private authService: AuthguardService,
        private router: Router,
        private route: ActivatedRoute,
        private cache: CacheService,
        private valoresStorage: ValoresStorageService,
        private comprasStorage: ComprasStorageService,
        private localtion: Location,
        private geolocation: Geolocation,
        private datePipe: DatePipe,
        private platform: Platform,
        private loader: LoadingController
    ) {
        this.tienda = this.route.snapshot.paramMap.get("codigo");
        this.codcategoriaseleccionada = this.route.snapshot.paramMap.get("codigocategoria");
        this.nombrecategoriaseleccionada = this.route.snapshot.paramMap.get("nombrecategoria");

        this.slider_variantes = {
            isBeginningSlide: true,
            isEndSlide: true
        };
        this.slider_articulos = {
            isBeginningSlide: true,
            isEndSlide: true
        };
        // this.obteniendoTotal();
    }

    ngOnInit() {
        this.cambiarCategoria(this.codcategoriaseleccionada);
        this.mostrarsubcategoriasArt();
    }

    ionViewWillEnter() {
        this.cache.clearAll();
        this.mostrarDireccionT();
        this.verSelect();
        this.mostrarcategoriasArt();
        this.mostrarProductos();
        this.mostraPromociones();
        this.mostrarNombreTienda();
        this.mostrarDatosTendero();
        this.obteniendoTotal();
        this.suma = null;
        this.view = true;
    }

    ionViewWillLeave() {
        this.cache.clearAll();
        this.platform.backButton.subscribe();
    }

    // Regresar al dashboard
    tiendas() {
        this.ionViewWillEnter();
        this.localtion.back();
    }

    mostrarDireccionT() {
        this.api.obtenerDireccion(this.cliente).subscribe(data => {
            this.direccion = data;
        });
    }

    mostrarNombreTienda() {
        this.api.obtenerInfoTenderos(this.tienda).subscribe(data => {
            this.tenderos = data;
            this.nombretienda = data[0].nombretienda;
            this.fototienda = data[0].foto_sm;
            // console.log(data);
            this.dia = new Date().getDay();
            this.hora = new Date();
            this.hora = this.hora = this.datePipe.transform(this.hora, 'HH:mm');
        });
    }

    mostrarDatosTendero() {
        this.api.obtenerTenderosUserId(this.tienda).subscribe(data => {
            let dat = data;
            for (let i = 0; i < dat.length; i++) {
                let element = dat[i].userId;
                this.userIdTendero = element
                return this.userIdTendero;
            }
        });
    }

    // Obtener categorias de tiendas | Se muestran las categorias en el menu
    mostrarcategoriasArt() {
        this.api.obtenercategoriasTienda2(this.tienda).subscribe(data => {
            this.categoriasarticulos = data;
        });
    }

    // Obtener subcategorias de una categoria | Se muestran las subcategorias en el menu
    mostrarsubcategoriasArt() {
        this.api.obtenersubcategorias(this.tienda, this.codcategoriaseleccionada).subscribe(data => {
            this.subcategoriasarticulos = data;
            this.subCategoryValue = this.subcategoriasarticulos[0]['codigo'];
            // console.log(this.subCategoryValue);
            // console.log(this.subcategoriasarticulos);
            for (let i = 0; i < 1; i++) {
                const element = data[i].codigo;
                const nombreelement = data[i].subcategoria;
                this.subcategoriafirst = element;
                this.nombresubcategoriafirst = nombreelement;
                // console.warn(this.subcategoriafirst);
            }

        });
    }

    // ---- Mostrar productos ----------------------------------------------------------------------
    async presentLoadingWithOptions() {
        const loading = await this.loader.create({
            spinner: 'crescent',
            duration: 5000,
            message: 'Cargando datos espera',
            translucent: false,
            cssClass: 'custom-class custom-loading',
            backdropDismiss: true
        });
        await loading.present();
        const { role, data } = await loading.onDidDismiss();
        // console.log('Loading dismissed with role:', role);
    }

    mostrarProductos() {
        this.api.obtenerArticulosTienda(this.tienda, this.codcategoriaseleccionada).subscribe(data => {
            this.articulos = data;
        });
    }

    // ---- Mostrar imagenes ----------------------------------------------------------------------
    mostrarimagenes() {
        this.api.obtenerImagenes().subscribe(data => {
            this.imagenes = data;
        });
    }

    mostraPromociones() {
        this.api.obtenerPromocionesTendero(this.tienda).subscribe(data => {
            this.promociones = data;
            // console.log(this.promociones)
        });
    }

    verCanasta() {
        this.router.navigate(["/gateway-canasta"]);
    }

    // ---- Ver Direccion Modal ----------------------------------------------------------------------
    async verDireccion(direccion) {
        this.router.navigate(["/direccion", this.cliente]);
    }

    // ---- Ver detalles del producto ---------------------------------------------------------------
    detallesProducto(codigo) {
        this.router.navigate(["/gateway-productos-detalle", codigo, this.tienda]);
    }

    addPromocion(codigo) {
        let user = this.userIdTendero;
        this.router.navigate(["/gateway-promociones-detalles", codigo, this.tienda, user]);
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
        });;
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

    // async obteniendoTotal() {
    //     await this.valoresStorage.getValores().then(items => {
    //         this.valores = items;
    //         // console.log(this.valores)

    //         if (this.valores == null) {
    //             // return this.suma == 0;
    //         }

    //         if (this.valores == 1) {
    //             this.suma = this.valores.cantidadCompra * this.valores.precioCompra;
    //             // return this.suma;
    //         }

    //         else {
    //             for (var i = 0; i < this.valores.length; i++) {
    //                 this.suma += this.valores[i].cantidadCompra * this.valores[i].precioCompra;
    //             }
    //             return this.suma;
    //         }
    //     });
    // }
    async obteniendoTotal() {

        this.comprasStorage.getCompras().then(items => {
            this.valores = items;
            console.log(this.valores);
            if (items) {
                console.log(this.valores.length);
                for (var i = 0; i < items.length; i++) {
                    let pu = items[i].precio_unitario;
                    let cant = items[i].cantidad;
                    this.suma += pu * cant;
                }
            }
            console.warn(this.suma)
            return this.suma;
        });
    }

    verTodos() {
        this.todos = true;
        this.select = false;
    }

    verSelect() {
        this.todos = false;
        this.select = true;
    }

    loadData() {
        // console.log('Cargando mas items');
    }

    cambiarCategoria(codigo) {
        // console.log('Codigo subcate: ' + codigo);
        this.verSelect();
        // this.nomcategoria = nombre;

        this.api.obtenersubcategorias(this.tienda, this.codcategoriaseleccionada).subscribe(data => {
            for (let i = 0; i < 1; i++) {
                const element = data[i].codigo;
                const nombreelement = data[i].subcategoria;
                this.subcategoriafirst = element;
                this.nombresubcategoriafirst = nombreelement;
                // console.warn(this.subcategoriafirst);
                this.api.obtenerArticulosSubCategoria(this.tienda, this.subcategoriafirst).subscribe(data => {
                    this.productossubcategorias = data;
                    // console.log(data);
                    if (data == '') {
                        this.noproductoscategoria = true;
                    }
                    else {
                        this.noproductoscategoria = false;
                    }
                });
            }
        });
    }

    cambiarSubCategoria(codigo: string, nombre: string, replace?: boolean) {
        this.subCategoryValue = codigo;
        // console.log(codigo, nombre);

        this.subcateg = false;
        // console.log('Codigo subcate: ' + codigo);
        this.verSelect();
        this.nomcategoria = nombre;
        this.api.obtenerArticulosSubCategoria(this.tienda, codigo).subscribe(data => {
            if (replace) {
                this.content.scrollToTop();
                this.productossubcategorias = data;
            } else {
                this.productossubcategorias = [...this.productossubcategorias, ...data.map(dato => dato)];
            }
            // console.log(this.productossubcategorias);            
            this.noproductoscategoria = data == '' ? true : false;
        });
    }


    buscador(busqueda) {
        let buscar = busqueda.value;
        if (buscar == '') {
            this.view = true;
        }
        else {
            // console.log("Buscando... " + buscar);
            this.view = false;
            this.busqueda = true;
            let tendero = this.tienda;
            this.api.obtenerBusquedaArticulosTiendaUnicamente(buscar, tendero).subscribe(data => {
                this.resultados = data;
                // console.log(this.resultados);

                if (this.resultados == []) {
                    // console.warn("vacio");
                }
            });
        }
    }

    // Controlar fin del scroll 

    async onScrollEnd(event: CustomEvent) {
        let scroll = await this.content.getScrollElement();
        if (scroll.offsetHeight + scroll.scrollTop >= scroll.scrollHeight) {
            // console.log('Fin del scroll', this.subCategoryValue );
            this.handleChangeScroll();
        }
    }

    handleChangeScroll() {
        let index = this.subcategoriasarticulos.findIndex(element => element.codigo == this.subCategoryValue);
        let item = this.subcategoriasarticulos.find((element, i) => i == index + 1);
        if (item) {
            this.cambiarSubCategoria(item.codigo, item.subcategoria);
            this.nomcategoria = item.subcategoria;
        }
    }

    ionSegmentChange(event) {

        let element = document.getElementById(`segment${this.subCategoryValue}`);

    }

}