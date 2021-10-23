import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-detallemenuproductopage',
    templateUrl: './detallemenuproductopage.page.html',
    styleUrls: ['./detallemenuproductopage.page.scss'],
})
export class DetallemenuproductopagePage implements OnInit {
    @Input('codigo') codigo;
    @Input('producto') producto;
    @Input('numberitem') numberitem;
    @Input('cantidad') cantidad;
    @Input('comentario') comentario;
    menu:any = [];

    constructor( private modalctrl: ModalController, private api: ApiService ) { }

    ngOnInit() {
    }
    
    ionViewWillEnter(){
        this.verDetalleMenu();
    }

    verDetalleMenu( ){
        console.warn( this.codigo )
        this.api.obtenermenuproducto( this.codigo ).subscribe( data => {
            console.log('obtenermenuproducto', data)
            this.menu = data;
        })
    }

    cerrarMenu(){
        this.modalctrl.dismiss();
    }

}
