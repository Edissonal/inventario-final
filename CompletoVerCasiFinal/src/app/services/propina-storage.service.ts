import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { CacheService } from 'ionic-cache';

/**
 * SERVICIO PARA ALMACENAR LA PROPINA DEL PEDIDO
 * */

export interface PropinaItem {
    codigo: number;
    propinaCompra: number;
}
const ITEMS_PROPINA = "propinas-02";

@Injectable({
    providedIn: "root",
})

export class PropinaStorageService {
    constructor(private storage: Storage, private cache: CacheService  ) { }

    //  Crear
    addPropina(item: any): Promise<any> {
        return this.storage.get(ITEMS_PROPINA).then((items: PropinaItem[]) => {
            if (items) {
                let propina_parse = JSON.parse(item);
                items.push(propina_parse);
                return this.storage.set(ITEMS_PROPINA, items);
            } else {
                return this.storage.set(ITEMS_PROPINA, [item]);
            }
        });
    }

    // Listar
    getPropinas(): Promise<PropinaItem[]> {
        return this.storage.get(ITEMS_PROPINA);
    }

    deletePropina( item) {
        return this.storage.get(ITEMS_PROPINA).then((items: PropinaItem[]) => {
            if ( !items || items.length === 0 ) {
                return null;
            }

            let toKeep: PropinaItem[] = [];

            for (let i of items) {
                if (i.propinaCompra !== item) {
                    toKeep.push( i);
                }
            }
            return this.storage.set(ITEMS_PROPINA, toKeep);
        });
    }

    //Vaciar Storage Compras y valores
    vaciarStorage() {
        this.cache.clearAll();
        return this.storage.remove(ITEMS_PROPINA);
    }

}
