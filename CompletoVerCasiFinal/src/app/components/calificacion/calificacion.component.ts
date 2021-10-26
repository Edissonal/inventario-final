import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { CacheService } from 'ionic-cache';
import { AuthguardService } from 'src/app/services/authguard.service';

@Component({
    selector: 'app-calificacion',
    templateUrl: './calificacion.component.html',
    styleUrls: ['./calificacion.component.scss'],
})
export class CalificacionComponent implements OnInit {
    ventas: any = [];

    constructor(private router: Router, private api: ApiService,
        private location: Location,
        private modalController: ModalController,
        private authService: AuthguardService,
        private cache: CacheService,
        private route: ActivatedRoute) {
    }

    ngOnInit() { }

    mostrarVentas() {
        this.authService.getSession().then( item => {
            let cliente = item;
            this.api.obtenerTodasVentasCliente( cliente ).subscribe(data => {
                this.ventas = data;
            });
        });
    }

}
