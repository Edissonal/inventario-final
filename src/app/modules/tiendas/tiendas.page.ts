import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MenuController, IonSlides, ModalController, Platform, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DatePipe, Location } from '@angular/common';

@Component({
    selector: 'app-tiendas',
    templateUrl: './tiendas.page.html',
    styleUrls: ['./tiendas.page.scss'],
})
export class TiendasPage implements OnInit {
    @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;

    slideOptsCatTiendas = {
        initialSlide: 0,
        slidesPerView: 3,
        loop: false,
        centeredSlides: false,
        spaceBetween: 4,
    };

    cdn_site = "https://cdn.vecino.com.co/";
    cliente;
    categoria;
    codCategoria;
    latcliente;
    loncliente;
    observador = null;
    direccion: any = [];
    sliderCatTiendas: any;
    categoriasT: any = [];
    view: boolean;
    busqueda: boolean;
    resultados: any = [];
    tencal: any = [];
    cercanas: any = [];
    cerrado: any = [];
    listatenderos: boolean = false;
    noitems: boolean = false;

    diaHoy = new Date();
    nomenclaturadia:any;
    constructor(private api: ApiService,
        private router: Router,
        private route: ActivatedRoute,
        private geolocation: Geolocation,
        private toast: ToastController,
        private datePipe: DatePipe,
        private platform: Platform) {
        this.cliente = this.route.snapshot.paramMap.get("cliente");
        this.categoria = JSON.parse(this.route.snapshot.paramMap.get("codigo"));

        this.sliderCatTiendas = {
            isBeginningSlide: true,
            isEndSlide: true
        };
    }

    ngOnInit() {
        this.mostrarDireccionCliente();
        this.mostrarcategoriasT();
    }

    ionViewWillEnter() {
        this.view = true;
        this.nomenclaturadia = this.obtenerDia( this.diaHoy.getDay());
    }

    ionViewWillLeave() {
        this.platform.backButton.subscribe();
    }

    obtenerDia( index ){
        let dia = new Array(7);
        dia[0] = "Domingo";
        dia[1] = "Lunes";
        dia[2] = "Martes";
        dia[3] = "Miércoles";
        dia[4] = "Jueves";
        dia[5] = "Viernes";
        dia[6] = "Sábado";
        return dia[index];
    }

    // Regresar al dashboard
    atras() {
        this.router.navigate(["/gateway"]);
    }

    mostrarDireccionCliente() {
        this.observador = this.geolocation.getCurrentPosition({
            timeout: 5000,
            enableHighAccuracy: true
        }).then((data) => {
            // console.warn(data);
            this.latcliente = data.coords.latitude;
            this.loncliente = data.coords.longitude;
            this.mostrarTenderos(this.latcliente, this.loncliente, this.categoria);
        }).catch((error) => {
            console.warn('Error getting location', error);
        });
    }

    // Obtener categorias de tiendas
    mostrarcategoriasT() {
        this.listatenderos = false;
        this.api.obtenerCateTiendas().subscribe(data => {
            this.categoriasT = data;
        });
    }

    mostrarTenderos(latcliente, loncliente, categoria) {
        this.listatenderos = true;
        this.codCategoria = categoria;
        this.api.obtenerTiendasCercanas_Tiendas120(latcliente, loncliente, this.codCategoria).subscribe(data => {
            if (data == '' ) {
                this.cercanas = '';
                console.log(data);
                this.noitems = true;
            }
            else {
                this.cercanas = data;
                console.log(data);
                this.noitems = false;
            }

        });
    }

    mostrarTenderos2(cod) {
        console.warn(cod);

        this.listatenderos = true;
        this.codCategoria = cod;
        this.api.obtenerTiendasCercanas_Tiendas120(this.latcliente, this.loncliente, cod).subscribe(data => {
            if (data == '') {
                console.log(data);
                this.noitems = true;
            }
            else {
                this.cercanas = data;
                console.log(data);
                this.noitems = false;
            }
        });
    }

    verTienda(codigo, letrero) {
        if (letrero == 'sin establecer' || letrero == 'cerrado') {
            // console.log(false);
            this.verTiendacerrada();
        }
        else {
            this.router.navigate(["/gateway-categorias", codigo]);
            // this.router.navigate(["/categoriasarticulos", this.cliente, codigo]);
        }
    }

    verTiendacerrada() {
        this.presentToast('Está tienda está cerrada, vuelve mañana!', 'danger');
    }

    verDireccion(direccion) {
        this.router.navigate(["/direccion", this.cliente]);
    }

    verTenderos(cod) {
        // console.log(cod);
        this.codCategoria = cod;
    }

    buscador(busqueda) {
        let buscar = busqueda.value;
        if (buscar == '') {
            this.view = true;
            this.mostrarTenderos2( this.codCategoria )
        }
        else {
            console.log("Buscando... " + buscar);
            this.view = false;
            this.busqueda = true;

            this.api.obtenerTiendaBusqueda(buscar, this.latcliente, this.loncliente).subscribe(data => {
                this.resultados = data;
                console.log( this.resultados )
            });
        }
    }

    async presentToast(message: string, color: string) {
        const toast = await this.toast.create({
            message,
            color,
            duration: 2000,
            translucent: false,
            position: 'top'
        });
        toast.present();
    }

}
