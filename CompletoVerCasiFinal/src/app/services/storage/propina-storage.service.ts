import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

/**
 * SERVICIO PARA ALMACENAR LA PROPINA DEL PEDIDO
 * */ 

export interface PropinaItem {
    propinaCompra: number;
}
const ITEMS_PROPINA = "propinas";

@Injectable({
    providedIn: "root",
})

export class PropinaStorageService {
    constructor(private storage: Storage) { }

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

    //Vaciar Storage Compras y valores
    vaciarStorage() {
        return this.storage.remove("propinas");
    }

}
