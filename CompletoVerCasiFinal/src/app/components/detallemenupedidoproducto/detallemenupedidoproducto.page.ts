import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-detallemenupedidoproducto',
    templateUrl: './detallemenupedidoproducto.page.html',
    styleUrls: ['./detallemenupedidoproducto.page.scss'],
})
export class DetallemenupedidoproductoPage implements OnInit {
    @Input('nombre') nombre;
    @Input('tipo') tipo;
    @Input('menu') menu;
    @Input('numeroitem') numeroitem;
    @Input('comentarios') comentarios;
    @Input('cantidad') cantidad;
    menus:any = [];


    constructor( private _modal: ModalController ) { }

    ngOnInit() {
        this.verMenu();
    }

    verMenu(){
        this.menus = this.menu;
        console.log( this.menus)
    }

    cerrarMenu(){
        this._modal.dismiss();
    }

}
