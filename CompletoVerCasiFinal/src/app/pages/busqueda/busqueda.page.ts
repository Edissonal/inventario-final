import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IonSearchbar, IonSlides, ModalController, Platform, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as $ from 'jquery'
import { CacheService } from 'ionic-cache';
import { ValoresStorageService } from 'src/app/services/valores-storage.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
    selector: 'app-busqueda',
    templateUrl: './busqueda.page.html',
    styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage {
    filterArticulo = '';
    noBusqueda: boolean;
    tienda;
    cliente;
    articulos: any = [];
    direccion: any = [];
    productos: any = [];
    categoriasarticulos: any = [];
    imagenes: any = [];
    resultados: any = [];
    tender: any = [];

    cdn_site = "https://cdn.vecino.com.co/";

    sliderTwo: any;
    alltenderos: any = [];
    calificaciones: any = [];

    sliderMenuVariantes: any;
    sliderProductos: any;

    slider_variantes: any = [];
    slider_articulos: any = [];

    slideOptsArticulos = {
        initialSlide: 0,
        slidesPerView: 2
    };
    suma = 0;
    
    // ----
    logs: String[] = [];
    latitude: any = 0; //latitude
    longitude: any = 0; //longitude
    address: string;
    red: boolean;
    inicio:boolean;
    //  ----
    R: number = 6371000;
    Rad600m;
    latCliente;
    lngCliente;
    radLatTendero: number;
    radLngTendero;
    total: number;
    sitios_cercanos: any = [];
    productoscercanos: any = [];
    promocionescercanas: any = [];
    verLatLng;
    tiendas_cercanas: any = [];
    cercanas: any = [];
    productosbuscados: any = [];

    latcliente;
    loncliente;
    
    @ViewChild( IonSearchbar ) IonSearchbar;

    constructor(private api: ApiService,
        private router: Router,
        private route: ActivatedRoute,
        private cache: CacheService,
        private platform: Platform,
        private geolocation: Geolocation,
        private localtion: Location,
        private modalController: ModalController,
        private toastCtrl: ToastController) {
        this.cliente = this.route.snapshot.paramMap.get("cliente");
        this.tienda = this.route.snapshot.paramMap.get("codigo");
    }

    ionViewWillEnter() {
        this.cache.clearAll();
        this.verTenderos();
        this.verAllArticulos();
        this.mostrarDireccionT();
        this.noBusqueda = true;
        this.platform.backButton.subscribeWithPriority(9999, () => {
            // this.iraAtras();
        });

        if( this.IonSearchbar.value == ''  ){
            this.inicio = true;
        }

        // this.productosbuscados = null;
    }

    ionViewWillLeave(){
        this.platform.backButton.subscribe();
    }

    mostrarDireccionT() {
        this.api.obtenerDireccion(this.cliente).subscribe(data => {
            this.direccion = data;
            this.latcliente = JSON.parse(data[0].latitud);
            this.loncliente = JSON.parse(data[0].longitud);
        });
    }

    // ---- Mostrar productos ----------------------------------------------------------------------
    mostrarProductos() {
        this.api.obtenerArticulosTienda(this.tienda, 0).subscribe(data => {
            this.articulos = data;
        });
    }


    // ---- Ver Direccion Modal ----------------------------------------------------------------------
    async verDireccion(direccion) {
        this.router.navigate(["/direccion", this.cliente]);
    }

    // Detalles del producto
    verDetallesProducto(codigo, tienda, letrero ) {
        let userid = '';
        if( letrero == "abierto"){
            this.router.navigate(["/producto-detalles", this.cliente, codigo, tienda, userid])
        }
        else {
            this.presentToast('La tienda que ofrece este producto está cerrada, vuelve mañana', 'danger', 3000, 'top');
        }
    }

    // ---- Ver Tenderos ----------------------------------------------------------------------
    verTenderos() {
        this.api.obtenerTodasTiendas().subscribe(data => {
            this.alltenderos = data;
        });
    }

    // ---- Ver Articulos ----------------------------------------------------------------------
    verAllArticulos() {
        this.api.obtenerArticulos().subscribe(data => {
            this.productos = data;
        });
    }

    iraAtras(){
        this.localtion.back();
    }

    // Busqueda de articulos
    buscar( busqueda){
        let buscar = busqueda.value;
        this.noBusqueda = false;
        this.inicio = false;
        this.productosbuscados = null;
        
        this.api.obtenerBusquedaProductosCercanos( buscar, this.latcliente, this.loncliente ).subscribe( data => {
            this.resultados = data;
            console.log(' bus  cer',data);
        });
    }

    limpiarbusqueda(){
        this.noBusqueda = true;
        this.resultados = 0;
        // this.productosbuscados = null;
    }

    mostrarResultados( value, codigo ){
        this.noBusqueda = false;
        this.inicio = false;
        this.resultados = null;

        let valor = value;
        console.warn(value)

        let valorcodigo = codigo;
        console.warn(valorcodigo);
        this.api.obtenerBusquedaProductosCercanosbyCod( valorcodigo, this.latcliente, this.loncliente  ).subscribe( data => {
            this.productosbuscados = data;
            console.log(data)
        });
    }

    obtenerCalificaciones(){
        this.api.obtenerCalificaciones().subscribe(data => {
            this.calificaciones = data;
        });
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

}
