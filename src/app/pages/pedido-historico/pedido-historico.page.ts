import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CacheService } from 'ionic-cache';
import * as countdown from 'countdown';
import * as moment from 'moment';
import * as $ from 'jquery';
import { Subscription, interval  } from 'rxjs';
import { flatMap } from "rxjs/operators";
import { PedidoDetallesCompraPage } from '../pedido-detalles-compra/pedido-detalles-compra.page';
import { PedidoHistorico } from './pedido-historico.interface';

interface Time {
  days: number;
  hours: number,
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-pedido-historico',
  templateUrl: './pedido-historico.page.html',
  styleUrls: ['./pedido-historico.page.scss'],
})
export class PedidoHistoricoPage implements OnInit, OnDestroy  {
  cdn_site = "https://cdn.vecino.com.co/";
    cliente;
    informacion: any = [];
    tiendas: any = [];
    ventas: PedidoHistorico[] = [];
    imagenes: any = [];
    detallesventas: any = [];
    hoy: number = Date.now();
    calificacion;

    // -----
    @Input() date: Date | string;
    time: Time = null;
    timerId: number = null;

    // ----
    logs: String[] = [];
    latitude: any = 0; //latitude
    longitude: any = 0; //longitude
    address: string;
    red: boolean;

    private subscription: Subscription;

    modal;
    pedidoscliente:any = [];
  constructor(private router: Router, private api: ApiService,
    private location: Location,
    private modalController: ModalController,
    private cache: CacheService,
    private toastController: ToastController,
    private route: ActivatedRoute) {
    this.cliente = this.route.snapshot.paramMap.get("cliente");

   }

  ngOnInit() {
    this.cache.clearAll();
    this.mostrarPedidos();
  }

  //--------------------||||||||| arriba ------------------------------------------
  ngOnDestroy(){
    this.subscription.unsubscribe();
}

ionViewWillEnter() {
    this.actualizar();
    //this.mostrarVentas();
}

actualizar() {
    this.subscription = interval(10000).subscribe(x => { 
        //this.mostrarVentas();
         //this.mostrarPedidosDia();
    });

}


mostrarTodasTienda() {
    this.api.obtenerTodasTiendas().subscribe(data => {
        this.tiendas = data;
    });
}

//pedidos Mes
mostrarPedidos() {
    this.api.obtenerTodosPedidosClienteHistorico(this.cliente).subscribe((data: PedidoHistorico[]) => {
        this.pedidoscliente = data;
        console.log('historico mes: ', data )
    });
}

// Pedidos Semana
mostrarPedidosSemana() {
  this.api.obtenerTodosPedidosClienteHistoricoSemana(this.cliente).subscribe((data: PedidoHistorico[]) => {
      this.pedidoscliente = data;
      console.log('historico semana: ', data )
  });
}

// Pedidos dia
mostrarPedidosDia() {
  this.api.obtenerTodosPedidosClienteHistoricoDia(this.cliente).subscribe((data: PedidoHistorico[]) => {
      this.pedidoscliente = data;
      console.log('historico dia: ', data )
  });
}  

pedidoscerrados( valores  ){
  console.log( valores );
  if( valores == 1 ){ // Todos Ultimo mes
      this.mostrarPedidos();
  }
  else if ( valores == 2){ // Esta semana
      this.mostrarPedidosSemana();
  }
  else if ( valores == 3){ // Hoy 
      this.mostrarPedidosDia();
  }
  
}


cancelarPedido( codigo, tendero){
    // console.log('Cancelar pedido: ', codigo, tendero);
    
    let cliente = JSON.parse(this.cliente);
    this.api.actualizarPedidoLaterTenMin( codigo, cliente, tendero ).subscribe(data => {
        // console.log('actualizarPedidoLaterTenMin', data);
    });
}

mostrarDetallesVentas() {
    this.api.obtenerTodasVentasLineas().subscribe(data => {
        this.detallesventas = data;
    });
}

mostrarImagenes() {
    this.api.obtenerImagenes().subscribe(data => {
        this.imagenes = data;
    })
}

iraDashboard() {
    this.router.navigate(["/dashboard", this.cliente, 'prev']);
     this.location.back();
}

async verDetalle(cod_ventas, fecha_envio, tiempo_envio) {
// async verDetalle(cod_ventas) {
    this.subscription.unsubscribe();
    this.modal = await this.modalController.create({
        component: PedidoDetallesCompraPage,
        cssClass: "modal-compras",
        componentProps: {
            cod_ventas: cod_ventas,
            fecha: fecha_envio,
            tiempoenvio: tiempo_envio
        }
    });

    this.ondissmiss();
   
    // console.log('modal dismiss', data);
    return await this.modal.present();
    // this.router.navigate(["pedidos-detalles-compra", cod_ventas]);

}
async ondissmiss() {
    await this.modal.onWillDismiss().then(res => {
        // console.log('modal dismiss');
       // this.mostrarVentas();
        this.actualizar()
    });
}

iraAtras() {
    this.location.back();
}

evaluar(radio) {
    // console.log(radio);
    this.calificacion = radio;
    return this.calificacion;
}

calificar(codigo) {
    this.api.actualizarPedidoCalificacion(codigo, this.calificacion).subscribe(data => {
        // console.log(data);
        this.presentToast("¡Tu calificación ha sido guardada!", "success");
        this.subscription.unsubscribe();
        // this.actualizar();
        this.ionViewWillEnter();
    })
}

async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
        message,
        color,
        duration: 2000,
        translucent: true,
    });
    toast.present();
}

}
