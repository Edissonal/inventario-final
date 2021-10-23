import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MenuController, IonSlides, ModalController, Platform, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DatePipe, Location } from '@angular/common';
import * as $ from 'jquery';

@Component({
    selector: 'app-tiendas',
    templateUrl: './tiendas.page.html',
    styleUrls: ['./tiendas.page.scss'],
})
export class TiendasPage implements OnInit {

    slideOptsCatTiendas = {
        initialSlide: 0,
        slidesPerView: 3,
        loop: false,
        centeredSlides: false,
        spaceBetween: 4,
    };

    @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;
    cdn_site = "https://cdn.vecino.com.co/";
    cliente;
    categoria;
    listatenderos: boolean = false;
    view: boolean;
    busqueda: boolean;
    sliderCatTiendas: any;
    direccion: any = [];
    categoriasT: any = [];
    tenderos: any = [];
    codCategoria;
    resultados: any = [];

    latitude: any = 0; //latitude
    longitude: any = 0; //longitude
    dia;
    hora;
    cerrado: any = [];

    tiendas_cercanas: any = [];
    cercanas: any = [];
    total: number;
    observador = null;
    ningunatienda: boolean = false;
    noitems:boolean = false;
    
    latcliente;
    loncliente;
    busquedas:any = [];
    horarios: any = [];
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
        // console.log(this.nomenclaturadia)
    }

    ionViewWillLeave() {
        this.platform.backButton.subscribe();
        // this.cache.clearAll();
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
    dashboard() {
        this.router.navigate(["/dashboard", this.cliente, 'prev']);
    }

    mostrarDireccionCliente() {
        this.api.obtenerDireccion(this.cliente).subscribe(data => {
            this.direccion = data[0].direccion;
            this.latcliente = data[0].latitud;
            this.loncliente = data[0].longitud;
            this.mostrarTenderos( this.latcliente, this.loncliente, this.categoria );
        });
    }

    mostrarTenderos( latcliente, loncliente, categoria) {
        this.listatenderos = true;
        this.codCategoria = categoria;
        this.api.obtenerTiendasCercanas_Tiendas120( latcliente, loncliente, this.codCategoria ).subscribe(data => {
            if( data == ''){
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
        // console.warn( cod );
        this.listatenderos = true;
        this.codCategoria = cod;
        this.api.obtenerTiendasCercanas_Tiendas120( this.latcliente, this.loncliente,  cod).subscribe(data => {
           if( data == ''){
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

    // Obtener categorias de tiendas
    mostrarcategoriasT() {
        this.listatenderos = false;
        this.api.obtenerCateTiendas().subscribe(data => {
            this.categoriasT = data;
        });
    }


    //  ------- Ver Tienda
    verTienda(codigo, letrero) {
        if (letrero == 'sin establecer' || letrero == 'cerrado') {
            // console.log(false);
            this.verTiendacerrada();
        }
        else {
            this.router.navigate(["/categorias", this.cliente, codigo]);
            // this.router.navigate(["/categoriasarticulos", this.cliente, codigo]);
        }
    }

    // ---- Ver Direccion Modal ----------------------------------------------------------------------
    verDireccion(direccion) {
        this.router.navigate(["/direccion", this.cliente]);
    }

    verTenderos(cod) {
        console.log(cod);
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

            this.busquedas.pop( );
            this.busquedas.push( buscar );

            this.api.obtenerTiendaBusqueda( this.busquedas,  this.latcliente, this.loncliente ).subscribe(data => {
                this.resultados = data;
                console.warn(data);
            });
        }
    }

    verTiendacerrada() {
        this.presentToast('Está tienda está cerrada, vuelve mañana!', 'danger');
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

    verhorarios( codigo ){
        $("#mashorarios_"+codigo).toggle("slow");
    }
}
