import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CacheService } from 'ionic-cache';
import { ApiService } from 'src/app/services/api.service';
import * as $ from 'jquery';
import { DetallemenuproductopagePage } from '../detallemenuproductopage/detallemenuproductopage.page';

@Component({
    selector: 'app-modalpedidoproductoscomprados',
    templateUrl: './modalpedidoproductoscomprados.page.html',
    styleUrls: ['./modalpedidoproductoscomprados.page.scss'],
})
export class ModalpedidoproductoscompradosPage {
    @Input('cod_ventas') cod_ventas;
    cdn_site = "https://cdn.vecino.com.co/";
    items: any = [];
    datos: any = [];
    _menus: any = [];
    menus: any = [];
    vermenu:boolean = false;

    constructor(
        private _modal: ModalController,
        private api: ApiService,
        private cache: CacheService
    ) { }

    ionViewWillEnter() {
        this.obtenerproductos();
    }

    cerrar() {
        this._modal.dismiss();
    }

    obtenerproductos() {
        this.api.obtenerDetalleVenta(this.cod_ventas).subscribe(data => {
            console.warn(data);
            for (let v = 0; v < data.length; v++) {
                this.items.push(data[v]);
            }
        });

    }

    async vermenuproducto(codigo, producto, i, cantidad, comentario) {
        const modapagel = await this._modal.create({
            component: DetallemenuproductopagePage,
            cssClass: 'my-custom-class',
            componentProps: {
                codigo: codigo,
                producto: producto,
                comentario: comentario,
                numberitem: i,
                cantidad: cantidad
            }
        });
        return await modapagel.present();
    }

    vercomentario( elemento ){
        console.log( elemento );
        $("#comentario_"+elemento).toggle("slow");
    }

}
