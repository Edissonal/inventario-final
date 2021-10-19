import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from "../../services/api.service";
import { ToastController, MenuController, IonSlides } from "@ionic/angular";
import { ModalController } from "@ionic/angular";
import { LoginInterface } from "../../interfaces/login.interface";
import { AuthguardService } from "../../services/authguard.service";
import { Location } from '@angular/common';
import { CacheService } from 'ionic-cache';
import { PushService } from 'src/app/services/push.service';

@Component({
  selector: 'app-inicio-login',
  templateUrl: './inicio-login.page.html',
  styleUrls: ['./inicio-login.page.scss'],
})
export class InicioLoginPage implements OnInit {

    log: LoginInterface = {
        email: '',
        password: ''
    }
    newItem: any;
    // 

    passwordType: string = 'password';
    passwordShow: boolean = false;
    eye: boolean = true;
    acceso: boolean;

    constructor( 
        private api: ApiService,
        private router: Router,
        private toastCtrl: ToastController,
        public modalController: ModalController,
        private menu: MenuController,
        private cache: CacheService,
        public pushService: PushService,
        private authSession: AuthguardService,
        private location: Location
     ) { 
         this.acceso = false;
     }

    ngOnInit() {
    }

    ionViewDidEnter(){
        this.menu.enable(false, 'first');
        this.menu.enable(false, 'gateway');
    }

    inicio(){
        // this.router.navigate(["/gateway"]);
        // this.router.navigate(["/inicio"]);
        this.location.back();
    }

    togglePasword(){
        if( this.passwordShow ){
            this.passwordShow = false;
            this.passwordType = 'password';
            this.eye = true;
        }
        else {
            this.passwordShow = true;
            this.passwordType = 'text';
            this.eye = false;
        }
    }

    recordar(){
        this.router.navigate(["/inicio-restablecer"]);
    }

    onLogin(){
        // console.log(this.log);
        if (this.log.email == "", this.log.password == "" ) {
            this.presentToast("Aún tienes campos vaciós en el formulario!", "warning");
        }
        else {
            let version = this.api.version_app;
            this.api.postLogin(this.log.email, this.log.password, version ).subscribe((data) => {
                if (data) {
                    // this.presentToast("¡Has iniciado sesión satisfactoriamente!", "success");
                    this.authSession.addSession(data).then(item => { this.newItem = <any>{}; });
                    this.pushService.filtroUserId( data );
                    this.router.navigate(["/dashboard", data, 'inicio-login']);
                }
            },
            (error) => {
                if (error) {
                    // this.presentToast("Su usuario o contraseña no son correctos!", "danger");
                    this.acceso = true;
                }
            });
        }
    }

    cerrarError(){
        this.acceso = false;
    }

    async presentToast(message: string, color: string) {
        const toast = await this.toastCtrl.create({
            message,
            color,
            duration: 2000,
            translucent: true,
            position: 'middle'
        });
        toast.present();
    }
}
