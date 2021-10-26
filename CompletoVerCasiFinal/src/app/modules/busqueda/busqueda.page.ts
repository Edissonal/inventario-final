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

    @ViewChild(IonSearchbar) IonSearchbar;
    cdn_site = "https://cdn.vecino.com.co/";
    tienda;
    cliente;
    latitudcliente;
    longitudcliente;
    observador = null;
    suma = 0;
    noBusqueda: boolean;
    direccion: any = [];
    resultados: any = [];
    tender: any = [];
    alltenderos: any = [];
    inicio: boolean;
    sitios_cercanos: any = [];
    productoscercanos: any = [];
    productosbuscados: any = [];

    constructor(private api: ApiService,
        private router: Router,
        private route: ActivatedRoute,
        private cache: CacheService,
        private platform: Platform,
        private geolocation: Geolocation,
        private localtion: Location,
        private modalController: ModalController,
        private toastCtrl: ToastController ) {
        this.cliente = this.route.snapshot.paramMap.get("cliente");
        this.tienda = this.route.snapshot.paramMap.get("codigo");
    }

    ionViewWillEnter() {
        this.mostrarDireccionCliente();
        this.noBusqueda = true;
        if (this.IonSearchbar.value == '') {
            this.inicio = true;
        }
        // this.productosbuscados = null;
    }

    ionViewWillLeave() {
        this.cache.clearAll();
        this.platform.backButton.subscribe();
    }

    mostrarDireccionCliente() {
        this.observador = this.geolocation.getCurrentPosition({
            // timeout: 5000,
            // enableHighAccuracy: true
        }).then((data) => {
            this.latitudcliente = data.coords.latitude;
            this.longitudcliente = data.coords.longitude;
        }).catch((error) => {
            console.warn('Error getting location', error);
            // this.mostrarMsgUbicacion();
        });
    };

    // ---- Ver Direccion Modal ----------------------------------------------------------------------
    async verDireccion(direccion) {
        this.router.navigate(["/direccion", this.cliente]);
    }

    // Detalles del producto
    verDetallesProducto(codigo, tienda, letrero) {
        // let userid = '';
        if (letrero == "abierto") {
            this.router.navigate(["/gateway-productos-detalle", codigo, tienda]);
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

    iraAtras() {
        this.localtion.back();
    }

    // Busqueda de articulos
    buscar(busqueda) {
        let buscar = busqueda.value;
        this.noBusqueda = false;
        this.inicio = false;
        this.productosbuscados = null;

        this.api.obtenerBusquedaProductosCercanos(buscar, this.latitudcliente, this.longitudcliente).subscribe(data => {
            this.resultados = data;
            console.log(data);
        });
    }

    limpiarbusqueda() {
        this.noBusqueda = true;
        this.resultados = 0;
        // this.productosbuscados = null;
    }

    mostrarResultados(value, codigo) {
        this.noBusqueda = false;
        this.inicio = false;
        this.resultados = null;

        let valor = value;
        console.warn(value)

        let valorcodigo = codigo;
        console.warn(valorcodigo);
        this.api.obtenerBusquedaProductosCercanosbyCod(valorcodigo, this.latitudcliente, this.longitudcliente).subscribe(data => {
            this.productosbuscados = data;
            console.log(data)
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
