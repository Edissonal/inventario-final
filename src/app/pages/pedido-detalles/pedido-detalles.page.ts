import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CacheService } from 'ionic-cache';
import * as countdown from 'countdown';
import * as moment from 'moment';
import * as $ from 'jquery';
import { Subscription, interval  } from 'rxjs';
import { flatMap } from "rxjs/operators";
import { PedidoDetallesCompraPage } from '../pedido-detalles-compra/pedido-detalles-compra.page';
import { PedidoDetalle } from './pedido-detalles.interface';

interface Time {
    days: number;
    hours: number,
    minutes: number;
    seconds: number;
}

@Component({
    selector: 'app-pedido-detalles',
    templateUrl: './pedido-detalles.page.html',
    styleUrls: ['./pedido-detalles.page.scss'],
})
export class PedidoDetallesPage implements OnInit, OnDestroy  {
    cdn_site = "https://cdn.vecino.com.co/";
    cliente;
    informacion: any = [];
    direccion: any = [];
    tiendas: any = [];
    ventas: PedidoDetalle[] = [];
    imagenes: any = [];
    detallesventas: any = [];
    hoy: number = Date.now();
    calificacion;

    // -----
    @Input() date: Date | string;
    time: Time = null;
    timerId: number = null;

    // ----
    logs: String[] = [];
    latitude: any = 0; //latitude
    longitude: any = 0; //longitude
    address: string;
    red: boolean;

    private subscription: Subscription;

    modal;
    pedidoscliente:any = [];

    constructor(private router: Router, private api: ApiService,
        private location: Location,
        private modalController: ModalController,
        private cache: CacheService,
        private toastController: ToastController,
        private alertController: AlertController,
        private route: ActivatedRoute) {
        this.cliente = this.route.snapshot.paramMap.get("cliente");
    }

    ngOnInit() {
        this.cache.clearAll();
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    ionViewWillEnter() {
        this.actualizar();
        this.mostrarVentas();
        this.mostrarDireccionT();
    }
    
    actualizar() {
        this.subscription = interval(10000).subscribe(x => { 
            this.mostrarVentas();
            // this.mostrarPedidos();
        });

    }

    mostrarDireccionT() {
        this.api.obtenerDireccion(this.cliente).subscribe(data => {
            this.direccion = data;
        });
    }

    mostrarTodasTienda() {
        this.api.obtenerTodasTiendas().subscribe(data => {
            this.tiendas = data;
        });
    }

    mostrarPedidos() {
        this.api.obtenerTodosPedidosCliente(this.cliente).subscribe((data: PedidoDetalle[]) => {
            this.pedidoscliente = data;
            // console.log( data )
        });
    }

    mostrarVentas() {
        this.cache.clearAll();
        this.api.obtenerTodasVentasCliente(this.cliente).subscribe((data: PedidoDetalle[]) => {
            this.ventas = data;
            // console.log(this.ventas);
            this.mostrarPedidos();

            this.ventas.forEach(element => {
                if (element.estatus != "3" && element.estatus != "4") {
                    let datePedido: any = new Date(element.fecha);
                    let today: any = new Date();
                    let difference = (today - datePedido );
                    let diffMinutes = Math.round((  (difference % 86400000) % 3600000) / 60000 );
                    console.log('Minutos de diferencia', diffMinutes);
                    if (diffMinutes > 15 ) {
                        this.cancelarPedido( element.codigo, element.cod_tendero);
                    } 
                } else if (element.estatus == "3" &&  !element.cod_calificacion) {
                    this.subscription.unsubscribe();
                }
            });
        });
    }

    cancelarPedido( codigo, tendero){
        let cliente = JSON.parse(this.cliente);
        this.api.actualizarPedidoLaterTenMin( codigo, cliente, tendero ).subscribe(data => {
            // console.log('actualizarPedidoLaterTenMin', data);
            console.log(data)
            if( data ){
                this.mostrarAlertaPedidoCancelado();
            }
        });

    }

    mostrarDetallesVentas() {
        this.api.obtenerTodasVentasLineas().subscribe(data => {
            this.detallesventas = data;
        });
    }

    mostrarImagenes() {
        this.api.obtenerImagenes().subscribe(data => {
            this.imagenes = data;
        })
    }

    iraDashboard() {
        this.router.navigate(["/dashboard", this.cliente, 'prev']);
        // this.location.back();
    }

    async verDetalle(cod_ventas, fecha_envio, tiempo_envio) {
    // async verDetalle(cod_ventas) {
        this.subscription.unsubscribe();
        this.modal = await this.modalController.create({
            component: PedidoDetallesCompraPage,
            cssClass: "modal-compras",
            componentProps: {
                cod_ventas: cod_ventas,
                fecha: fecha_envio,
                tiempoenvio: tiempo_envio
            }
        });

        this.ondissmiss();
       
        // console.log('modal dismiss', data);
        return await this.modal.present();
        // this.router.navigate(["pedidos-detalles-compra", cod_ventas]);

    }
    async ondissmiss() {
        await this.modal.onWillDismiss().then(res => {
            // console.log('modal dismiss');
            this.mostrarVentas();
            this.actualizar()
        });
    }

    iraAtras() {
        this.location.back();
    }

    evaluar(radio) {
        // console.log(radio);
        this.calificacion = radio;
        return this.calificacion;
    }

    calificar(codigo) {
        this.api.actualizarPedidoCalificacion(codigo, this.calificacion).subscribe(data => {
            // console.log(data);
            this.presentToast("¡Tu calificación ha sido guardada!", "success");
            this.subscription.unsubscribe();
            // this.actualizar();
            this.ionViewWillEnter();
        })
    }

    async presentToast(message: string, color: string) {
        const toast = await this.toastController.create({
            message,
            color,
            duration: 2000,
            translucent: true,
        });
        toast.present();
    }

    async mostrarAlertaPedidoCancelado() {
        const alert = await this.alertController.create({
            backdropDismiss: false,
            translucent: true,
            mode: "ios",
            cssClass: "msgalertagps",
            header: "Vecino, se ha cancelado tu pedido",
            message: "Por problemas del tendero con la confirmación. Pide de nuevo en este u otro negocio de tu gusto.",
            buttons: [
                {
                    text: "Aceptar",
                    cssClass: "msgalertagps_button",
                    handler: () => {
                        this.alertController.dismiss();
                    },
                },
            ],
        });

        alert.present();
    }
}
