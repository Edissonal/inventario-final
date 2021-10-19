import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

export interface CompraItem {
    id: number;
    modified: number;
    nombre: string;
    codigo_cliente: number;
    codigo_tendero: number;
    estatus: number;
    totalfactura: number;
    codigo_articulos: number;
    cantidad: number;
    precio_unitario: number;
    precioLinea: number;
}

const ITEMS_KEY = "compras";

@Injectable({
    providedIn: "root",
})
export class ComprasStorageService {
    constructor(private storage: Storage) { }

    //  Crear
    addCompra(item: CompraItem): Promise<any> {
        return this.storage.get(ITEMS_KEY).then((items: CompraItem[]) => {
            if (items) {
                items.push(item);
                return this.storage.set(ITEMS_KEY, items);
            } else {
                return this.storage.set(ITEMS_KEY, [item]);
            }
        });
    }

    // Listar
    getCompras(): Promise<CompraItem[]> {
        return this.storage.get(ITEMS_KEY);
    }

    // Modificar
    updateCompra(item: CompraItem): Promise<any> {
        return this.storage.get(ITEMS_KEY).then((items: CompraItem[]) => {
            if (!items || items.length === 0) {
                return null;
            }

            let newItems: CompraItem[] = [];

            for (let i of items) {
                if (i.id == item.id) {
                    newItems.push(item);
                } else {
                    newItems.push(i);
                }
            }
            return this.storage.set(ITEMS_KEY, newItems);
        });
    }

    // Eliminar
    deleteCompra(codigo: number): Promise<any> {
        return this.storage.get(ITEMS_KEY).then((items: CompraItem[]) => {
            if (!items || items.length === 0) {
                return null;
            }

            let toKeep: CompraItem[] = null;

            for (let i of items) {
                if (i.id !== codigo) {
                    toKeep.push(i);
                }
            }
            return this.storage.set(ITEMS_KEY, toKeep);
        });
    }

    //Vaciar Storage Compras y valores
    vaciarStorage() {
        return this.storage.remove("compras");
    }
}
