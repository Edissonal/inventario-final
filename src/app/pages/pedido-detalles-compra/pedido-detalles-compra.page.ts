import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { CacheService } from 'ionic-cache';
import { ApiService } from 'src/app/services/api.service';
import { AuthguardService } from 'src/app/services/authguard.service';
import * as countdown from 'countdown';
import * as moment from 'moment';
import * as $ from 'jquery';
import { element } from 'protractor';
import { Subscription, interval } from 'rxjs';
import { ChatPage } from '../chat/chat.page';
import { ChatService } from 'src/app/services/chat.service';
import { ModalpedidoproductoscompradosPage } from '../../components/modalpedidoproductoscomprados/modalpedidoproductoscomprados.page';

interface Time {
    days: number;
    hours: number,
    minutes: number;
    seconds: number;
}

@Component({
    selector: 'app-pedido-detalles-compra',
    templateUrl: './pedido-detalles-compra.page.html',
    styleUrls: ['./pedido-detalles-compra.page.scss'],
})
export class PedidoDetallesCompraPage implements OnInit, OnDestroy {
    cdn_site = "https://cdn.vecino.com.co/";

    // Listen Chat messages
    haveMessages: boolean = false;
    private chatSuscription: Subscription;

    @Input() cod_ventas;
    @Input() fecha;
    @Input() tiempoenvio;

    progreso: any = [];
    ventas: any = [];
    tiendas: any = [];
    detalles: any = [];
    countproductos;
    articulos: any = [];
    imagenes: any = [];

    // 
    fpedido: any = [];
    tpedido: any = [];

    // 
    p_totalfactura;
    p_propina;
    p_comision;
    p_totalproductos;
    datos: any = [];
    datos2: any = [];

    /**
     * Contador
     */
    @Input() date: Date | string;
    time: Time = null;
    timerId: number = null;
    // -----
    @Input() date2: Date | string;
    time2: Time = null;
    timerId2: number = null;

    fecha_pedido;
    fecha_inicial;
    ahora;
    retraso: number = -30;
    comparacion: number;
    success: boolean;
    warning: boolean;
    danger: boolean;

    tlSuma = [];
    pasarelas_pago:any = [];
    totalproductosacomprar:any = [];

    private subscription: Subscription;
    estados:any = [];

    constructor(private api: ApiService,
        private modalController: ModalController,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthguardService,
        private platform: Platform,
        private cache: CacheService,
        private _chat: ChatService) {
    }

    ngOnInit() {
        // this.fecha_pedido = moment(this.fecha).format('YYYY-MM-DD HH:mm:ss');
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
        this._chat.setMessages([]);
        this.chatSuscription.unsubscribe();
    }

    ionViewWillEnter() {
        this.actualizar();
        this.mostrarProgreso();
        // this.mostrarDetalleVentas();
        this.mostrarPedido();
        this.comparando();
        this.getMessages();
    }

    getMessages() {        
        this.chatSuscription = this._chat.notifyChatMessages(this.cod_ventas.toString()).subscribe(
            res => {
                this.haveMessages = res.find( m => !m.view)? true : false;
            }
        );
    }
    
    actualizar() {
        this.subscription = interval(10000).subscribe(x => { 
            this.mostrarProgreso();
        });
    }

    mostrarPedido() {
        this.api.obtenerPedido(this.cod_ventas).subscribe(data => {
            // this.datos = data;
            for (let i = 0; i < data.length; i++) {
                this.datos = data[i].pedido;
                console.log(this.datos)
            }

            for (let c = 0; c < data.length; c++) {
                this.totalproductosacomprar = data[c].cantidadproductos;
            }

            for (let i = 0; i < this.datos.length; i++) {
                const element = this.datos[i];
                let comision = JSON.parse(this.datos[i].comision);
                let propina = JSON.parse(this.datos[i].propina);
                let total = JSON.parse(this.datos[i].totalfactura);
                let envio = JSON.parse(this.datos[i].envio);
                let suma = total + comision + propina + envio ;
                this.tlSuma = JSON.parse(suma);
                return this.tlSuma;
            }

        });
    }

    mostrarContador() {
        let x = moment(this.fecha).format('YYYY-MM-DD HH:mm:ss');
        let y = moment(this.fecha).add(this.tiempoenvio, 'm');
        this.ahora = moment().format('YYYY-MM-DD HH:mm:ss');
        this.timerId = countdown(y, (ts) => {
            this.time = ts;
            this.comparacion = moment(y).diff(this.ahora, 'minutes');
        }, countdown.HOURS | countdown.MINUTES | countdown.SECONDS);
    }

    mostrarProgreso() {
        this.api.obtenerestadopedido( this.cod_ventas ).subscribe(data => {
            this.cache.clearAll();
            this.estados = data;
        });
    }

    comparando() {
        if (this.comparacion > 11) {
            this.success = true;
            this.warning = false;
            this.danger = false;
        }

        if (this.comparacion <= 11 && this.comparacion > 5) {
            this.success = false;
            this.warning = true;
            this.danger = false;
        }

        if (this.comparacion <= 5) {
            this.success = false;
            this.warning = false;
            this.danger = true;
        }
    }

    mostrarTiendas() {
        this.api.obtenerTodasTiendas().subscribe(data => {
            // console.log('tiendas', this.tiendas);
            this.tiendas = data;
        });
    }

    verTienda(codigo) {
        this.modalController.dismiss();
        this.authService.getSession().then((item: any) => {
            let cliente = JSON.parse(item);
            this.router.navigate(["/categorias", cliente, codigo]);
        });
    }

    cerrar() {
        this.modalController.dismiss();

        this.authService.getSession().then((item: any) => {
            let cliente = JSON.parse(item);
            if (this.router.url == "/pedido-detalles", cliente) {
                this.router.navigate(["/pedido-detalles", cliente])
                this.modalController.dismiss();
                this.cache.clearAll();
                clearInterval(this.timerId)
                clearInterval(this.timerId2)
            }
            else {
                clearInterval(this.timerId)
                clearInterval(this.timerId2)
                this.router.navigate(["/pedido-detalles", cliente])
                this.modalController.dismiss();
                this.cache.clearAll();
            }
        });
    }

    async verChat(cod_ventas: string, tendero: string) {

        // this.subscription.unsubscribe();
        // this._chat.setMessages([]);
        // this.chatSuscription.unsubscribe();
        const modal = await this.modalController.create({
            component: ChatPage,
            cssClass: 'modal-chat',
            componentProps: {
                cod_ventas,
                tendero,
            }
        });
        return await modal.present();

        // const modal = await this.modalController.create({
        //     component: PedidoDetallesCompraChatPage,
        //     cssClass: "modal-compras",
        //     componentProps: {
        //         cod_ventas: cod_ventas,
        //         tendero: tendero
        //     }
        // });
        // return await modal.present();
    }

    verPasarelas(){
        this.api.obtenerPasarelasPago().subscribe(data => {
            this.pasarelas_pago = data;
            // console.log( data )
        });
    }

    async vermodalproductos() {
        const modal = await this.modalController.create({
            component: ModalpedidoproductoscompradosPage,
            cssClass: 'my-custom-class',
            componentProps: {
                cod_ventas: this.cod_ventas
            }
        });
        return await modal.present();
    }

}
