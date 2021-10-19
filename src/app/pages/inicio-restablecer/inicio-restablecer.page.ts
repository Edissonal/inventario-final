import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from "../../services/api.service";
import { ToastController, MenuController, IonSlides, AlertController } from "@ionic/angular";
import { ModalController } from "@ionic/angular";
import { AuthguardService } from "../../services/authguard.service";
import { CacheService } from 'ionic-cache';
import { RestablecerInterface } from 'src/app/interfaces/restablecer.interface';

@Component({
  selector: 'app-inicio-restablecer',
  templateUrl: './inicio-restablecer.page.html',
  styleUrls: ['./inicio-restablecer.page.scss'],
})
export class InicioRestablecerPage implements OnInit {

    conocerrest = {
        email: ''
    }


    rest: RestablecerInterface = {
        email: '',
        password: ''
    }

    newItem: any;

    mostrarestablecer: boolean = false;

    constructor( 
        private api: ApiService,
        private router: Router,
        private toastCtrl: ToastController,
        public modalController: ModalController,
        private alertController: AlertController,
        private menu: MenuController,
        private cache: CacheService,
        private authSession: AuthguardService
     ) { }

    ngOnInit() {
    }

    ionViewDidEnter(){
        this.menu.enable(false, 'first');
        this.menu.enable(false, 'gateway');
    }

    inicio(){
        this.router.navigate(["/inicio"]);
    }

    
    conocerantes() {
        if (this.conocerrest.email == "") {
            this.presentToast("Sin tu correo electrónico, no podemos enviarte tu contraseña!", "warning");
        }
        else {
            this.api.conocerantesderestablecer(this.conocerrest.email).subscribe(data => {
                console.log(data);
                if ( data == 3 ) {
                    this.mostrarestablecer = true;
                    console.warn("Cliente existente");
                }
                else if( data == 2) {
                    this.errorAlertCliente();
                }
                else {
                    this.errorAlert();
                }
            });
        }
    }

    onRestablecer() {
        console.log( this.conocerrest.email)
        if (this.rest.password == "") {
            this.presentToast("Vecino necesita ingresar su nueva contraseña para iniciar en el sistema!", "warning");
        }
        else {
            this.api.restablecerPassword(this.conocerrest.email, this.rest.password).subscribe(data => {
                if( data ) {
                    this.successAlerta();
                }
            });
        }
    }

    async presentToast(message: string, color: string) {
        const toast = await this.toastCtrl.create({
            message,
            color,
            duration: 2000,
            position: 'top',
            mode: 'md',
        });
        toast.present();
    }

    async successAlerta() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            backdropDismiss: false,
            header: 'Contraseña modificada',
            message: 'Vecino, su contraseña ha sido modificada satisfactoriamente, recibirá una notificación en su dispositivo.',
            mode: 'ios',
            translucent: true,
            buttons: [
                {
                    text: 'Aceptar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        this.router.navigate(["/inicio-login"]);
                        this.rest.email = '';
                        this.rest.password = '';
                        this.conocerrest.email = '';
                        this.mostrarestablecer = false;
                    }
                }
            ]
        });

        await alert.present();
    }

    async errorAlertCliente() {
        const alert = await this.alertController.create({
            backdropDismiss: false,
            cssClass: 'my-custom-class',
            header: 'El correo '+this.conocerrest.email+' no corresponde a un cliente',
            message: 'Vecino, el correo que ingresaste no corresponde a un cliente registrado, verificalo o ponte en contacto con soporte@vecino.com.co',
            mode: 'ios',
            translucent: true,
            buttons: [
                {
                    text: 'Aceptar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                       alert.dismiss();
                    }
                }
            ]
        });

        await alert.present();
    }

    async errorAlert() {
        const alert = await this.alertController.create({
            backdropDismiss: false,
            cssClass: 'my-custom-class',
            header: 'Cliente no encontrado',
            message: 'Vecino, el correo '+this.conocerrest.email+' no está dentro de nuestros registros, verificalo o ponte en contacto con soporte@vecino.com.co',
            mode: 'ios',
            translucent: true,
            buttons: [
                {
                    text: 'Aceptar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                       alert.dismiss();
                    }
                }
            ]
        });

        await alert.present();
    }
}
