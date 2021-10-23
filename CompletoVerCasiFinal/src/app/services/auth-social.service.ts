import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import {
    SignInWithApple,
    AppleSignInResponse,
    AppleSignInErrorResponse,
    ASAuthorizationAppleIDRequest
} from '@ionic-native/sign-in-with-apple/ngx';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { AuthguardService } from './authguard.service';
import { PushService } from './push.service';

type loginAuth = 'Google' | 'Facebook' | 'Normal' | 'Apple'
export interface User {
    displayName?: string,
    familyName?: string,
    givenName?: string,
    email?: string,
    imageUrl?: string,
    photoURL?: string,
    phoneNumber?: string,
    refreshToken?: string,
    type?: loginAuth
}

@Injectable({
    providedIn: 'root'
})
export class AuthSocialService {

    private userObs: BehaviorSubject<User> = new BehaviorSubject<User>({});
    user: User;
    newItem: any;

    constructor(
        private _router: Router,
        private _platform: Platform,
        private afAuth: AngularFireAuth,
        private googlePlus: GooglePlus,
        private signInWithApple: SignInWithApple,
        private facebook: Facebook,
        private api: ApiService,
        private authSession: AuthguardService,
        public pushService: PushService,
        private router: Router,
        private alertCtrl: AlertController,
        private loadingcontroller: LoadingController,
        private alertController: AlertController,
        private toastController: ToastController
    ) { }

    getValue() {
        return this.userObs.value;
    }

    getState() {
        return this.userObs.asObservable();
    }

    setState(user: User) {
        this.user = user;
        this.userObs.next(user);
    }

    LoginApple() {
        this.signInWithApple.signin({
            requestedScopes: [
                ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
                ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
            ]
        })
            .then((res: AppleSignInResponse) => {
                // https://developer.apple.com/documentation/signinwithapplerestapi/verifying_a_user
                // alert('Send token to apple for verification: ' + res.identityToken);
                console.log(res);
                this.setState({ ...res, type: 'Apple' });
            })
            .catch((error: AppleSignInErrorResponse) => {
                // alert(error.code + ' ' + error.localizedDescription);
                console.error(error);
            });
    }

    async loginGoogle() {
        // this.getStatus();
        if (this._platform.is('android')) {
            this.googlePlus.trySilentLogin({
                'webClientId': environment.webClientId,
                'offline': false
            }).then(res => {
                // alert('then');
                // alert(JSON.stringify(res));
                this.setState({ ...res, type: 'Google' });
                if (res) {
                    this.login(res.email);
                }
            })
                .catch(async (err) => {
                    // alert('catch');
                    // alert(JSON.stringify(err));
                    // this.presentToastError(  err );

                    if (err == 4) {
                        const res = await this.googlePlus.login({
                            'webClientId': environment.webClientId,
                            'offline': true
                        });
                        const resConfirmed = await this.afAuth.signInWithCredential(firebase.default.auth.GoogleAuthProvider.credential(res.idToken));
                        // alert('resConfirmed');
                        // alert(JSON.stringify(resConfirmed));     
                        const user = resConfirmed.user;
                        // alert('user');
                        // alert(JSON.stringify(user));     
                        // this.user.type = 'Google';
                        this.setState({ ...user, type: 'Google' });
                        if (user) {
                            this.login(user.email);
                        }
                    }
                })
        }
    }

    async verifyLoginFacebook() {
        let message = "Estas continuando con facebook, por favor espera un momento!";
        this.notificacionLoaderConexion(message);

        this.facebook.getLoginStatus().then(async (res) => {
            // alert('res getLoginStatus' )
            // alert(JSON.stringify(res));
            if (res.status === 'connected') {

                // Si esta logueado con la aplicacion
                const facebookCredentials = firebase.default.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);

                // alert('facebookCredentials' )
                // alert(JSON.stringify(facebookCredentials));
                const resConfirmed = await this.afAuth.signInWithCredential(facebookCredentials);
                // alert('resConfirmed' )
                // alert(JSON.stringify(resConfirmed));
                const user = resConfirmed.user;
                // alert('user' )
                // alert(JSON.stringify(user));

                if (user) {
                    this.setState({ ...user, type: 'Facebook' });
                    // this.setState(user);
                    this.login(user.email);
                }

            } else {

                // El usuario no esta registrado ni conectado con la aplicación
                const response: FacebookLoginResponse = await this.facebook.login(['public_profile', 'email']);
                // alert('response' )
                // alert(JSON.stringify(response));
                const facebookCredentials = firebase.default.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
                // alert('facebookCredentials' )
                // alert(JSON.stringify(facebookCredentials));
                const resConfirmed = await this.afAuth.signInWithCredential(facebookCredentials);
                // alert('resConfirmed' )
                // alert(JSON.stringify(resConfirmed));
                const user = resConfirmed.user;
                // user.
                // alert('user' )
                // alert(JSON.stringify(user));
                // let message = "Aún no estas registrado en vecino. Por favor espera un momento y realizaremos este proceso juntos";
                // this.notificacionLoaderConexion(message);

                this.setState({ ...user, type: 'Facebook' });
                if (user) {
                    this.login(user.email);
                }
            }
        }).catch(
            err => {
                // alert('error catch facebook' )
                // alert(JSON.stringify(err));
                // Aqui se arroja error si el email ya ha sido utilizado con Google u otro proveedor
                if (err.code === 'auth/account-exists-with-different-credential') {
                    // this.presentAlert(
                    //     'Email en uso', 
                    //     `La cuenta con la que intenta ingresar ya existe.`
                    // );
                    this.mostrarRegistroRepetido();
                }
            }
        );;
    }

    login(credentials) {
        let version = this.api.version_app;
        this.api.postLogin(credentials, credentials, version).subscribe((data) => {
            // alert('postLogin')
            // alert(JSON.stringify(data))
            if (data) {
                // this.presentToast("¡Has iniciado sesión satisfactoriamente!", "success");
                this.authSession.addSession(data).then(item => { this.newItem = <any>{}; });
                this.pushService.filtroUserId(data);
                this.router.navigate(["/dashboard", data, 'inicio-login']);
            } else {
                this.getStatus(credentials)
            }
        },
            (error) => {
                // alert('error login')
                // alert(JSON.stringify(error))
                this.getStatus(credentials);
            });
    }

    async getStatus(email) {
        let exists = await this.validateEmail(email);
        if (!exists) {
            this._router.navigate(['/inicio-registro']);
        }
    }

    validateEmail(email: string) {
        return new Promise<boolean>((resolve, reject) => {

            this.api.conociendoRegistro(email).subscribe(data => {
                if (data[0]) {
                    let info = data[0];
                    if (info.profilesId == 2 || info.profilesId == 3) {
                        // this.presentAlert(
                        //     'Email en uso', 
                        //     `Este email ya se ha registrado como vecino ${info.profilesId ==2? 'tendero': 'cliente'}.`
                        // );
                        let message = "La cuenta con la cual intentas ingresar ya pertenece a vecino con registro normal, por favor intenta conectarte con otra distinta";
                        this.notificacionLoaderConexion(message);
                        resolve(true);
                    } else if (info.profilesId < 2 || info.profilesId > 3) {
                        resolve(false);
                    }
                } else {
                    resolve(false);
                }
            });
        })
    }

    async presentAlert(header: string, message: string) {
        const alert = await this.alertCtrl.create({
            header: header,
            message,
            buttons: ['Aceptar']
        });

        await alert.present();
    }

    logOutFacebook() {
        this.facebook.logout()
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    logOutGoogle() {
        this.googlePlus.logout()
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    // -- Loader de inicio con redes
    async notificacionLoaderConexion(message: string) {
        const loading = await this.loadingcontroller.create({
            cssClass: 'loader-pedido',
            message: message,
            translucent: true,
            mode: "md",
            backdropDismiss: false,
            duration: 2000
        });
        await loading.present();
    }

    async mostrarRegistroRepetido() {
        const alert = await this.alertController.create({
            backdropDismiss: false,
            translucent: true,
            mode: "ios",
            cssClass: "msgalertagps",
            header: "Vecino, esta cuenta ya existe!",
            message: "Vecino, esta cuenta ya ha sido registrada como vecino app normal, no puedes asociar esta cuenta a facebook. Intenta ingresar con una cuenta distinta.",
            buttons: [
                {
                    text: "Aceptar",
                    cssClass: "msgalertagps_button",
                    handler: () => {
                        this.authSession.eliminarSesion();
                    },
                },
            ],
        });

        alert.present();
    }

    async presentToastError( message ) {
        const toast = await this.toastController.create({
            header: 'Continuando con Google',
            message: message,
            color: 'danger',
            mode: 'md',
            translucent: true,
            position: 'top',
            buttons: [
                {
                    text: 'Aceptar',
                    role: 'cancel',
                    handler: () => {
                        toast.dismiss();
                    }
                }
            ]
        });
        await toast.present();
    }
}
