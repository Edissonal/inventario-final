import { Injectable } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BackhardwareService {

  categoriasart

  init() {
    this.platform.backButton.subscribeWithPriority(999999, () => {
      navigator['app'].exitApp();
      this.platform.resume.subscribe();
    });
  }

  constructor(
    private platform: Platform,
    private alertController: AlertController
  ) { }


  async mostrarAlert() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      translucent: true,
      mode: "ios",
      cssClass: "msgalertagps",
      header: "Vecino, debes completar nuevamente este proceso",
      message: "Tu tienda no ha podido crearse, vuelve a intentarlo.",
      buttons: [
        // {
        //   role: 'Cancel',
        //   text: "Cancelar",
        //   cssClass: "msgalertagps_button",
        //   handler: () => {
        //     this.alertController.dismiss();
        //     this.pretiendaService.eliminarCategorias();
        //     this.pretiendaService.eliminarSubCategorias();
        //     this.pretiendaService.eliminarProductos();
        //   },
        // },
        {
          text: "Aceptar",
          cssClass: "msgalertagps_button",
          handler: () => {
            navigator['app'].exitApp();
            this.platform.resume.subscribe();
          },
        }
      ]
    });

    alert.present();
  }

}
