import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { AuthguardService } from 'src/app/services/authguard.service';

@Component({
    selector: 'app-pedido-hecho',
    templateUrl: './pedido-hecho.page.html',
    styleUrls: ['./pedido-hecho.page.scss'],
})
export class PedidoHechoPage implements OnInit {
    cliente;
    cod_ventas;
    cod_fecha;
    cod_tenvio;
    constructor(
        private authService: AuthguardService,
        private modalController: ModalController,
        private route: ActivatedRoute,
        private platform: Platform,
        private router: Router) {
        this.cod_ventas = this.route.snapshot.paramMap.get("codigo");
        this.cod_fecha = this.route.snapshot.paramMap.get("fecha");
        this.cod_tenvio = this.route.snapshot.paramMap.get("tiempoenvio");
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        setTimeout(() => {
            this.cerrarModal();
        }, 1000);
    }

    ionViewWillLeave(){
        this.platform.backButton.subscribe();
    }

    cerrarModal() {
        this.authService.getSession().then((data: any) => {
            this.cliente = JSON.parse(data);
            this.router.navigate(["/pedido-detalles", this.cliente]);
        });
    }
}