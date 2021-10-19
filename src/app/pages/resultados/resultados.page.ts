import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { IonSlides, ModalController, Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery'
import { CacheService } from 'ionic-cache';
import { ValoresStorageService } from 'src/app/services/valores-storage.service';
import { DireccionPage } from '../direccion/direccion.page';

@Component({
    selector: 'app-resultados',
    templateUrl: './resultados.page.html',
    styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage {
    tienda;
    cliente;
    articulos: any = [];
    direccion: any = [];
    productos: any = [];
    categoriasarticulos: any = [];
    imagenes: any = [];

    cdn_site = "https://cdn.vecino.com.co/";

    sliderTwo: any;
    alltenderos: any = [];
    calificaciones: any = [];

    sliderMenuVariantes: any;
    sliderProductos: any;

    slider_variantes: any = [];
    slider_articulos: any = [];

    // @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;

    slideOptsArticulos = {
        initialSlide: 0,
        slidesPerView: 2
    };

    suma = 0;

    constructor(private api: ApiService,
        private router: Router,
        private route: ActivatedRoute,
        private cache: CacheService,
        private platform: Platform,
        private modalController: ModalController) {
        this.cliente = this.route.snapshot.paramMap.get("cliente");
        this.tienda = this.route.snapshot.paramMap.get("codigo");
    }

    ionViewWillEnter() {
        this.cache.clearAll();
        this.verTenderos();
        this.verAllArticulos();
        this.mostrarDireccionT();
        this.mostrarimagenes();

        this.platform.backButton.subscribeWithPriority(9999, () => {
            // this.iraAtras();
        });
    }

    ionViewWillLeave(){
        this.platform.backButton.subscribe();
        this.cache.clearAll();
    }




    // ---- Mostrar direccion ----------------------------------------------------------------------
    mostrarDireccionT() {
        this.api.obtenerDireccion(this.cliente).subscribe(data => {
            this.direccion = data;
        });
    }

    // ---- Mostrar productos ----------------------------------------------------------------------
    mostrarProductos() {
        this.api.obtenerArticulosTienda(this.tienda, 0).subscribe(data => {
            this.articulos = data;
        });
    }

    // ---- Mostrar imagenes ----------------------------------------------------------------------
    mostrarimagenes() {
        this.api.obtenerImagenes().subscribe(data => {
            this.imagenes = data;
        });
    }

    // ---- Ver Direccion Modal ----------------------------------------------------------------------
    async verDireccion(direccion) {
        const modal = await this.modalController.create({
            component: DireccionPage,
            cssClass: 'modal-direccion',
            componentProps: {
                cliente: this.cliente,
                dire: direccion
            }
        });
        return await modal.present();
    }


    // Detalles del producto
    verDetallesProducto(codigo, tienda) {
        this.router.navigate(["/producto-detalles", this.cliente, codigo, tienda])
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

}
