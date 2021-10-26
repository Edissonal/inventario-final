import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonTextarea, ModalController } from '@ionic/angular';

@Component({
    selector: 'app-modalcomentariospedido',
    templateUrl: './modalcomentariospedido.page.html',
    styleUrls: ['./modalcomentariospedido.page.scss'],
})
export class ModalcomentariospedidoPage implements OnInit {
    txtcomentario;
    @Input('comentario') comentario;
    btnactive: boolean;

    constructor( private _modal: ModalController ) { }

    ngOnInit() {
       if( this.comentario == null ){
           this.comentario = "";
           this.btnactive = false;
       }
       else {
            this.txtcomentario = this.comentario;
           this.btnactive = true;
       }
    }

    comentarios( comentario ) {
        this.txtcomentario = comentario;
        this.btnactive = true;
    }

    addComentario(   ){
        this._modal.dismiss({
            comentario: this.txtcomentario
        });
    }

    close(){
        if( this.txtcomentario == '' ){
            this._modal.dismiss({
                comentario: ''
            });
        }
        else {
            this._modal.dismiss({
                comentario: this.txtcomentario
            });
        }
    }



}
