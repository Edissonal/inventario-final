import { Injectable } from '@angular/core';
import { ValorInterface } from '../interfaces/valor.interface';
import { CompraInterface } from '../interfaces/compra.interface';
import { Storage } from '@ionic/storage'

export interface Item {
    modificado: string
    codigo?: number;
    nombre?: string;
    precio?: number;
    cantidad?: number;
    valorCompra?: number;
}

const ITEMS_KEY = 'compras';

@Injectable({
    providedIn: 'root'
})
export class ApistorageService {

    compra: CompraInterface[];
    valores: ValorInterface[];

    constructor(private storage: Storage) {
        this.compra = [];
        this.valores = [];
    }

    /*----------  Agregar  compra----------*/
    addCompra(compra: CompraInterface) {
        this.compra.push(compra);

        if (localStorage.getItem('compras') === null) {
            this.compra.push(compra);
            localStorage.setItem('compras', JSON.stringify(this.compra));
        }
        else {
            compra = JSON.parse(localStorage.getItem('compras'));
            this.compra.push(compra);
            localStorage.setItem('compras', JSON.stringify(compra));
        }

    }

    /*----------  Listar  compras ----------*/
    getCompras() {
        if (localStorage.getItem('compras') === null) {
            return this.compra;
        }
        else {
            this.compra = JSON.parse(localStorage.getItem('compras'));
            return this.compra;
        }
    }

    /*----------  Eliminar  compra----------*/
    deleteItem(codigo: number): Promise<Item> {
        return this.storage.get(ITEMS_KEY).then((items: Item[]) => {
            if (!items || items.length === 0) {
                return null;
            }

            let toKeep: Item[] = [];

            for (let i of items) {
                if (i.codigo !== codigo) {
                    toKeep.push(i);
                }
            }
            return this.storage.set(ITEMS_KEY, toKeep);
        });
    }



    // quitarProducto ( compra: CompraInterface ) {
    //   for( let i = 0; i < this.compras.length; i-- ) {
    //     if( compra == this.compras[i] ) {
    //       this.compras.splice( i, 1);
    //       localStorage.setItem('compras', JSON.stringify(this.compras));
    //     }
    //   }
    // }


    quitarProducto(id) {
        localStorage.removeItem(id);
    }

    cleanCompra(compra: Item) {
        this.compra.pop();
    }



    // TOTAL CARRITO
    getValores() {
        if (localStorage.getItem('valores') === null) {
            return this.valores;
        }
        else {
            this.valores = JSON.parse(localStorage.getItem('valores'));
            return this.valores;
        }
    }

    addValor(valor: ValorInterface) {
        this.valores.push(valor);
        let valores: ValorInterface[] = [];

        if (localStorage.getItem('valores') === null) {
            valores.push(valor);
            localStorage.setItem('valores', JSON.stringify(valores));
        }
        else {
            valores = JSON.parse(localStorage.getItem('valores'));
            valores.push(valor);
            localStorage.setItem('valores', JSON.stringify(valores));
        }
    }

    // quitarValor ( valor: ValorInterface ) {
    //   for( let i = 0; i < this.valores.length; i++) {
    //     if( valor == this.valores[i] ) {
    //       this.valores.splice( i, 1);
    //       localStorage.setItem('valores', JSON.stringify(this.valores));
    //     }
    //   }
    // }

    quitarValor(valor: ValorInterface) {
        for (let i = 0; i < this.valores.length; i++) {
            if (valor == this.valores[i]) {
                this.valores.splice(i, 1);
                localStorage.setItem('valores', JSON.stringify(this.valores));
            }
        }
    }
}
