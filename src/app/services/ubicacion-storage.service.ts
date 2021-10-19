import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

export interface UbicacionItem {
    codigo: number;
    modified?: number;
    direccion?: string;
    departamento?: string;
    ciudad?: string;
    tipo?: string;
    tipon1?: string;
    tipon2?: string;
    complemento?: string;
    detalles?: string;
    barrio?: string;
    latitud?: string;
    longitud?: string;
}

const ITEMS_KEY = "ubicacion-02";

@Injectable({
    providedIn: "root",
})
export class UbicacionStorageService {

    constructor(private storage: Storage) { }

    //  Crear
    addUbicacion(item: UbicacionItem): Promise<any> {
        return this.storage.get(ITEMS_KEY).then((items: UbicacionItem[]) => {
            if (items) {
                items.push(item);
                return this.storage.set(ITEMS_KEY, items);
            } else {
                return this.storage.set(ITEMS_KEY, [item]);
            }
        });
    }

    // Listar
    getUbicaciones(): Promise<UbicacionItem[]> {
        return this.storage.get(ITEMS_KEY);
    }

    // Modificar
    updateUbicacion(item: UbicacionItem): Promise<any> {
        return this.storage.get(ITEMS_KEY).then((items: UbicacionItem[]) => {
            if (!items || items.length === 0) {
                return null;
            }

            let newItems: UbicacionItem[] = [];

            for (let i of items) {
                if (i.codigo == item.codigo) {
                    newItems.push(item);
                } else {
                    newItems.push(i);
                }
            }
            return this.storage.set(ITEMS_KEY, newItems);
        });
    }

    // Eliminar
    deleteUbicacioni(codigo: number) {
        return this.storage.get(ITEMS_KEY).then((items: UbicacionItem[]) => {
            if ( !items || items.length === 0 ) {
                return null;
            }

            let toKeep: UbicacionItem[] = [];

            for (let i of items) {
                if (i.codigo !== codigo) {
                    toKeep.push( i);
                }
            }
            return this.storage.set(ITEMS_KEY, toKeep);
        });
    }

    //Vaciar Storage Compras y valores
    vaciarStorage() {
        return this.storage.remove(ITEMS_KEY);
    }
}
