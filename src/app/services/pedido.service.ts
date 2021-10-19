import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

export interface PedidoItem {
    modified: number;
    codigo: number;
	codigo_cliente: number;
	codigo_tendero: number;
	codigo_usuarios_tendero: number;
	estatus: number;
    totalfactura: number;
    propina: number;
}

const ITEMS_KEY = "pedido-01";

@Injectable({
    providedIn: "root",
})
export class PedidoService {
    constructor(private storage: Storage) { }

    //  Crear
    addPedido(item: PedidoItem): Promise<any> {
        return this.storage.get(ITEMS_KEY).then((items: PedidoItem[]) => {
            if (items) {
                items.push(item);
                return this.storage.set(ITEMS_KEY, items);
            } else {
                return this.storage.set(ITEMS_KEY, [item]);
            }
        });
    }

    // Listar
    getPëdidos(): Promise<PedidoItem[]> {
        return this.storage.get(ITEMS_KEY);
    }

    // Modificar
    updatePedido(item: PedidoItem): Promise<any> {
        return this.storage.get(ITEMS_KEY).then((items: PedidoItem[]) => {
            if (!items || items.length === 0) {
                return null;
            }

            let newItems: PedidoItem[] = [];

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
    deletePedido(codigo: number): Promise<any> {
        return this.storage.get(ITEMS_KEY).then((items: PedidoItem[]) => {
            if (!items || items.length === 0) {
                return null;
            }

            let toKeep: PedidoItem[] = null;

            for (let i of items) {
                if (i.codigo !== codigo) {
                    toKeep.push(i);
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
