import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { CacheService } from 'ionic-cache';


@Injectable({
    providedIn: 'root'
})

export class PushService {

    mensajes: OSNotificationPayload[] = [];
    userId: string;
    ONESIGNAL_APP_ID = '791cb11f-22c7-46b1-8987-760e55a7dd90'; // ID DE CLIENTES ONE SIGNAL
    FIREBASE_ID_DEL_REMITENTE = '967176738938';

    pushListener = new EventEmitter<OSNotificationPayload>();

    constructor(
        private alertController: AlertController,
        private platform: Platform,
        private oneSignal: OneSignal,
        private router: Router,
        private cache: CacheService,
        private storage: Storage,
    ) {
        this.cargarMensajes();
    }

    ionViewWillEnter() {
    }

    async getMensajes() {
        await this.cargarMensajes();
        return [...this.mensajes];
    }

    configuracionInicail(cliente) {
        this.oneSignal.startInit(this.ONESIGNAL_APP_ID, this.FIREBASE_ID_DEL_REMITENTE);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.handleNotificationReceived().subscribe((noti) => {
            this.notyRecibida(noti);
            // this.mostrarMsgActualizacion( cliente );
        });
        this.oneSignal.handleNotificationOpened().subscribe((noti) => {
            this.notyRecibida(noti.notification);
            this.router.navigate(["/pedido-detalles", cliente]);
        });

        // Obtener user Id del suscriptor
        this.oneSignal.getIds().then(info => {
            this.userId = info.userId;
        });
        this.oneSignal.endInit();

    }

    filtroUserId(userid) {
        this.oneSignal.sendTag("userId", userid);
    }

    async notyRecibida(noti: OSNotification) {
        await this.cargarMensajes();
        const payload = noti.payload;
        const existePush = this.mensajes.find(mensaje => mensaje.notificationID === payload.notificationID);

        if (existePush) {
            return
        }
        else {
            this.mensajes.unshift(payload);
            this.pushListener.emit(payload);
            await this.guardarMensajes();
        }
    }

    guardarMensajes() {
        this.storage.set("mensajes", this.mensajes);
    }

    async cargarMensajes() {
        this.mensajes = await this.storage.get('mensajes') || [];
        return this.mensajes;
    }

    async borrarMensajes() {
        await this.storage.remove('mensajes');
        this.mensajes = [];
        this.guardarMensajes();
    }

    // async mostrarMsgActualizacion( cliente  ) {
    //     const alert = await this.alertController.create({
    //         backdropDismiss: false,
    //         cssClass: "my-custom-class",
    //         header: "Cambio de estado",
    //         message: "Vecino, su pedido ha cambiado de estado",
    //         buttons: [
    //             {
    //                 text: "Aceptar",
    //                 cssClass: "primary",
    //                 handler: () => {
    //                     // console.warn( this.router.url);
    //                     this.router.navigate(["/pedido-detalles", cliente]);
    //                     let rutaactual = "/pedido-detalles/"+cliente;
    //                     // console.log( rutaactual )
    //                     if (  this.router.url == rutaactual ){
    //                         this.router.navigate(["/pedido-detalles", cliente]);
    //                     }
    //                 },
    //             },
    //         ],
    //     });

    //     alert.present();
    // }

}
