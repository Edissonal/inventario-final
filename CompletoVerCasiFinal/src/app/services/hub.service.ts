import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthguardService } from './authguard.service';

export interface Mensaje {
    VentaId: number,
    UsuarioIdDestino: number,
    Mensaje: string,
    Fecha: string,
    Entregado: Boolean,
}

@Injectable({
    providedIn: 'root'
})

export class HubService {
    // private hubConnection: signalR.HubConnection;
    // // Para poder usar la conexión con el hub, es necesario añadir la IP en el archivo
    // // \resources\android\xml\network_security_config.xml dentro del tag domain-config, eje:
    // /*
    // <?xml version="1.0" encoding="utf-8"?>
    // <network-security-config>
    //     <domain-config cleartextTrafficPermitted="true">
    //         <domain includeSubdomains="true">152.44.37.77</domain>
    //     </domain-config>
    // </network-security-config>
    // */
    // //De esta manera, se permite el fetch de la conexión con sockets dentro de 
    // //aplicaciones ionic en dispositivos android

    // // private HubURL = `http://152.44.37.77:4000/Chat`;
    // //private HubURL = `http://155.138.213.125:4000/Chat`; //Temporal
    // // private HubURL = `http://192.168.0.18:4000/Chat`; //Local
    // // private HubURL = `http://190.144.153.182:4000/Chat`; // Servidor Julio - prueba 2
    // // private HubURL = `http://152.44.37.77:4000/Chat`; // Servidor de Vecino
    // private mensajes: { [id: number]: Mensaje[] } = {}
    // private mensajesObservable: BehaviorSubject<{ [id: number]: Mensaje[] }> = new BehaviorSubject<{ [id: number]: Mensaje[] }>(this.mensajes);
    // cliente
    // tipoUsuario = 1;//Cliente
    // //Clave en local storage, cada envio tendrá su propia clave
    // //así la lectura y escritura serán más eficientes
    // MENSAJESKEY = `mensajes_`

    // constructor(
    //     private authService: AuthguardService,
    //     private toastController: ToastController,
    //     private localStorage: Storage) {
    //     this.authService.getSession()
    //         .then(cliente => {
    //             //Obtener id del cliente
    //             this.cliente = cliente;
    //             this.StartService();
    //         })
    // }

    // private StartService() {
    //     if (!this.hubConnection) {
    //         this.hubConnection = new signalR.HubConnectionBuilder()
    //             .withUrl(this.HubURL)
    //             .withAutomaticReconnect()
    //             .build();
    //         this.hubConnection.on("MensajesPendientes", async (msgs) => {
    //             msgs.sort(this.orderDates)
    //             for (let i = 0; i < msgs.length; i++) {
    //                 const element = msgs[i];
    //                 await this.prepareList(element.ventaId)
    //                 this.mensajes[element.ventaId].push({
    //                     Entregado: true,
    //                     Fecha: new Date(element.fecha + (element.fecha.endsWith('Z') ? '' : 'Z')).toString(), //Se añade la Z si no la tiene para indicar que es hora estándar
    //                     Mensaje: element.mensaje,
    //                     UsuarioIdDestino: Number(element.usuarioIdDestino),
    //                     VentaId: element.ventaId
    //                 })
    //                 this.localStorage.set(this.MENSAJESKEY + element.ventaId, this.mensajes[element.ventaId]);
    //             }
    //             //Informar del cambio en la lista
    //             this.emit();
    //             //Informar que se han recibido exitosamente los mensajes pendientes
    //             this.hubConnection.invoke("NotificacionMensajesRecibidos", Number(this.cliente));
    //             //TODO marcar con un indicador las compras que tengan mensajes pendientes por leer
    //             //cada mensaje recibido tiene el id, así que en este punto se podrían leer uno por uno
    //             //y marcar los pedidos correspondientes en la interfaz
    //             // this.presentToast("Tiene mensajes pendientes", "primary");
    //         });
    //         this.hubConnection.on("NuevoMensaje", async (ms) => {
    //             await this.prepareList(ms.ventaId); //Cargar mensajes de local storage o inicializar memoria
    //             //Castear al objeto apropiado
    //             this.mensajes[ms.ventaId].push({
    //                 Entregado: true,
    //                 Fecha: new Date(ms.fecha).toString(),
    //                 Mensaje: ms.mensaje,
    //                 UsuarioIdDestino: Number(ms.usuarioIdDestino),
    //                 VentaId: ms.ventaId
    //             })
    //             this.emit();
    //             this.localStorage.set(this.MENSAJESKEY + ms.ventaId, this.mensajes[ms.ventaId]);
    //             //Reportar recibido
    //             this.hubConnection.invoke("ReportarRecibido", Number(this.cliente), ms.mensaje);
    //             // this.presentToast("Ha llegado un nuevo mensaje", "primary");
    //         });
    //         //Evento de reconexión
    //         this.hubConnection.onreconnected(() => {
    //             // this.presentToast("Reconectado con el chat", "primary");
    //             //Registrar nuevamente, porque el ID puede cambiar
    //             this.hubConnection.invoke("RegistrarUsuarios", Number(this.cliente), this.tipoUsuario)
    //         })
    //         //Evento de pérdida de conexión
    //         this.hubConnection.onclose(() => {
    //             // this.presentToast("Se ha perdido la conexión con el chat", "primary");
    //         })
    //         //Iniciar la comunicación
    //         this.hubConnection
    //             .start()
    //             .then(() => {
    //                 //Se registra el usuario con el id actual
    //                 // this.presentToast("Chat conectado", "danger");
    //                 this.hubConnection.invoke("RegistrarUsuarios", Number(this.cliente), this.tipoUsuario)
    //                     // .then(() =>{
    //                     // this.presentToast("Envío de registro de usuario correcto" + this.cliente, "danger")
    //                     // })
    //                     .catch((error) => {
    //                         // this.presentToast("Error al registrar" + error.toString()   , "primary");
    //                     });

    //             })
    //             .catch((error) => {
    //                 //  Es la única notificación que se quiere mostrar en la parte inferior, de resto
    //                 //  todas las notificaciones se muestran en la parte superior.
    //                 // this.presentToast("Error al conectar al chat", "primary");
    //             });
    //     }
    // }

    // //Ordenar mensajes entrantes por fecha, por si vienen mal ordenados del servidor
    // orderDates(a, b) {
    //     if (a.fecha > b.fecha) {
    //         return 1;
    //     }
    //     if (a.fecha < b.fecha) {
    //         return -1;
    //     }
    //     //a es igual a b
    //     return 0;
    // }

    // //Cargar lista o crearla si no existe en memoria
    // private async prepareList(ventaID: any) {
    //     //Si no está cargada en memoria la lista
    //     if (!this.mensajes[ventaID])
    //         //Obtener los mensajes de la misma que estén guardados localmente
    //         await this.localStorage.get(this.MENSAJESKEY + ventaID)
    //             .then(mns => {
    //                 if (mns) {
    //                     //Si hay mensajes locales, cargarlos
    //                     this.mensajes[ventaID] = mns;
    //                 } else {
    //                     //Si no hay mensajes, crear una lista vacía
    //                     this.mensajes[ventaID] = []
    //                 }
    //             })
    //             .catch(err => console.warn(err));
    // }

    // //Se obtiene una lista observable de mensajes para mostrar en ventana
    // //Y escuchar por si hay cambios
    // getMensajes(id: number): Observable<{ [id: number]: Mensaje[] }> {
    //     this.prepareList(id)
    //         .then(() => this.emit())
    //     return this.mensajesObservable.asObservable();
    // }

    // //TODO borrar los mensajes para el pedido cuanto este haya terminado
    // borrarMensajes(idVenta: number) {
    //     this.localStorage.remove(this.MENSAJESKEY + idVenta)
    // }

    // enviarMensaje(m: Mensaje) {
    //     this.hubConnection.invoke(`EnviarMensajePara`, {
    //         VentaId: Number(m.VentaId), //Se tienen que castear para enviar al servicio
    //         UsuarioIdDestino: Number(m.UsuarioIdDestino),
    //         Mensaje: m.Mensaje,
    //         Fecha: new Date(),
    //         Entregado: false,
    //     }).then(() => {
    //         console.log('entro');

    //         //Cambiar el estado si se pudo enviar
    //         m.Entregado = true;
    //     }).catch(err => {
    //         console.log(err);
    //         // this.presentToast("No se pudo enviar el mensaje", "primary");
    //     }).finally(async () => {
    //         await this.prepareList(m.VentaId);
    //         //Guardar en lista actual
    //         this.mensajes[m.VentaId].push(m);
    //         //Guardar localmente
    //         this.localStorage.set(this.MENSAJESKEY + m.VentaId, this.mensajes[m.VentaId]);
    //         this.emit();
    //     });
    // }

    // //Actualizar observable
    // emit() {
    //     this.mensajesObservable.next(this.mensajes)
    // }

    // async presentToast(message: string, color: string) {
    //     const toast = await this.toastController.create({
    //         message,
    //         color,
    //         mode: "ios",
    //         duration: 2000,
    //         translucent: false,
    //         position: "top"
    //     });
    //     toast.present();
    // }
}