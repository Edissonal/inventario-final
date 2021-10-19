import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network/ngx";
import { Platform, ToastController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";

export enum ConnectionStatus  {
  Online,
  Offline
}

@Injectable({
  providedIn: "root",
})
export class NetworkService {
  
  private statusNetwork: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);
  onConnectSub: any;
  onDisconnectSub: any;

  constructor(
    private network: Network,
    private platform: Platform,
    private toastController: ToastController
  ) {
    this.platform.ready().then(() => {
      this.onConnect();
      this.onDisconnect();
    })
  }

  setStatusNetwork(status: ConnectionStatus) {
    this.statusNetwork.next(status);
    let connection = status == ConnectionStatus.Online? 'con conexión' : 'sin conexión, por favor verifique su internet para poder continuar.';
    let message = `Dispositivo ${ connection }`;
    if( ConnectionStatus.Online){
      this.presentToast(message, 3000, 'success');
    }
    else {
      this.presentToast(message, 3000, 'warning');
    }
  }

  get getTypeConnection() {
    return this.network.type;
  }

  get getStatusValue() {
    return this.statusNetwork.value;
  }

  getStatusNetwork() {
    return this.statusNetwork.asObservable();
  }

  onDisconnect() {
    this.onDisconnectSub = this.network.onDisconnect().subscribe(() => {
      let status = ConnectionStatus.Offline;
      this.setStatusNetwork(status);
    });
  }

  onConnect() {
    this.onConnectSub = this.network.onConnect().subscribe(() => {
      let status = ConnectionStatus.Online;
      this.setStatusNetwork(status);
    })
  }

  async presentToast(message: string, duration: number, color: string) {
    const toast = await this.toastController.create({
      message,
      duration,
      color: color,
      position: 'top',
      mode: 'ios',
      translucent: true
    });
    toast.present();
  }
}
