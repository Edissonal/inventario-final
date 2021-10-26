import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";


@Component({
    selector: 'app-modalmenuproducto',
    templateUrl: './modalmenuproducto.page.html',
    styleUrls: ['./modalmenuproducto.page.scss'],
})
export class ModalmenuproductoPage implements OnInit {

    @Input('producto') producto;
    @Input('menu') menu;
    cdn_site = "https://cdn.vecino.com.co/";
    
    infoproducto = [];
    infomenu;

    constructor(
        private modalController: ModalController
    ) {
    }
    
    ngOnInit() {
        this.verProducto();
    }

    verProducto(){
        this.infoproducto.push( this.producto )
        console.log( this.infoproducto )
    }

    cerrar() {
        this.modalController.dismiss();
    }

}
