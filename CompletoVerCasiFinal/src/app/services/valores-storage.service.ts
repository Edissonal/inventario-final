import { Injectable, EventEmitter } from "@angular/core";
import { Storage } from "@ionic/storage";

export interface ValorItem {
    modified: number;
    codigo: number;
    cantidadCompra:number;
    precioCompra: number;
    valorCompra: number;
}

const ITEMS_KEY2 = "valores-02";

@Injectable({
    providedIn: "root",
})
export class ValoresStorageService {

    valoresEmitter$ = new EventEmitter;

    constructor(private storage: Storage) { }

    //  Crear
    addValor(item: ValorItem): Promise<any> {
        return this.storage.get(ITEMS_KEY2).then((items: ValorItem[]) => {
            if (items) {
                items.push(item);
                return this.storage.set(ITEMS_KEY2, items);
            } else {
                return this.storage.set(ITEMS_KEY2, [item]);
            }
        });
    }

    // Listar
    getValores(): Promise<ValorItem[]> {
        return this.storage.get(ITEMS_KEY2);
    }

    // Modificar
    updateValor(item: ValorItem): Promise<any> {
        
        return this.storage.get(ITEMS_KEY2).then((items: ValorItem[]) => {
            if (!items || items.length === 0) {
                return null;
            }

            let newItems: ValorItem[] = [];

            for (let i of items) {
                // console.log( i.modified )
                // console.log( item.modified )
                if (i.modified == item.modified) {
                    newItems.push(item);
                } else {
                    newItems.push(i);
                }
            }
            return this.storage.set(ITEMS_KEY2, newItems);
        });
    }

    // Eliminar
    deleteValor(modificado: any) {
        return this.storage.get(ITEMS_KEY2).then((items: ValorItem[]) => {
            if ( !items || items.length === 0 ) {
                return null;
            }

            let toKeep: ValorItem[] = [];

            for (let i of items) {
                if (i.modified !== modificado) {
                    toKeep.push( i);
                }
            }
            return this.storage.set(ITEMS_KEY2, toKeep);
        });
    }

    vaciarStorage() {
        return this.storage.remove(ITEMS_KEY2);
    }

}
