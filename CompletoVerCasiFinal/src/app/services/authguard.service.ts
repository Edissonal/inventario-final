import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

/**
 * SERVICIO PARA ALMACENAR LA SESION DEL USUARIO
 * */ 

const ITEMS_KEY = "vecinoclientes-02";

@Injectable({
	providedIn: "root",
})
export class AuthguardService {
	constructor(private storage: Storage) {}

	//  Crear
	addSession(item: any): Promise<any> {
		return this.storage.get(ITEMS_KEY).then((items: any[]) => {
			if (items) {
				items.push(item);
				return this.storage.set(ITEMS_KEY, items);
			} else {
				return this.storage.set(ITEMS_KEY, [item]);
			}
		});
	}

	// Listar
	getSession(): Promise<any[]> {
		return this.storage.get(ITEMS_KEY);
    }
    
    getSession_cliente() {
		this.storage.get(ITEMS_KEY).then( (data:any ) => {
            return JSON.parse(data);
        });
	}

	//Vaciar Storage Compras y valores
	eliminarSesion() {
        return this.storage.remove(ITEMS_KEY);
    }
    

    // 

}
