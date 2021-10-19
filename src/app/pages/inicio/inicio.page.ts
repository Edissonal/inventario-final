import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { AuthSocialService } from '../../services/auth-social.service';


@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.page.html',
    styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
    version;
    constructor(
        private router: Router,
        private menu: MenuController,
        public platform: Platform,
        private api: ApiService,
        private location: Location,
        private authSocial: AuthSocialService,

    ) { }

    ngOnInit() {
    }

    ionViewDidEnter() {
        this.menu.enable(false, 'first');
        this.menu.enable(false, 'gateway');
        this.version = this.api.version_app;
    }

    login() {
        this.router.navigate(["/inicio-login"]);
    }

    registrese() {
        this.router.navigate(["/inicio-registro"]);
    }

    gateway() {
        // this.router.navigate(["/gateway-canasta"]);
        this.location.back();
    }

    cancelar() {
        this.router.navigate(["/gateway"]);
    }
    
    loginGoogle() {
        this.authSocial.loginGoogle();
    }

    loginFacebook() {
        this.authSocial.verifyLoginFacebook();
    }

    loginApple() {
        this.authSocial.LoginApple();
    }

    restablecer(){
        this.router.navigate(["/inicio-restablecer"]);
    }


}
