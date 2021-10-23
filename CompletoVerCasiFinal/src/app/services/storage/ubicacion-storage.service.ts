import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

export interface DireccionItem {
    id: number,
    codigo_direccion: number,
    modified: number,
    nombre_ubicacion: string,
    pais: string,
    departamento: string,
    ciudad: string,
    direccion_via_tipo:string,
    direccion_via_numero: string,
    direccion_acceso_numero: string,
    direccion_acceso_complemento: string,
    direccion_detalles_ubicacion: string,
    direccion_barrio: string,
    direccion_completa: string,
    direccion_latitud: string,
    direccion_longitud: string
}

const ITEMS_UBICACION = "direcciones";

@Injectable ( {
    providedIn: "root",
}  )

export class DireccionStorageService {
    constructor ( private storage: Storage  ) { }

    addDireccion ( item: DireccionItem  ): Promise<any> {
        return this.storage.get ( ITEMS_UBICACION  ).then (  ( items: DireccionItem[]  ) => {
            if  ( items  ) {
                items.push ( item  );
                return this.storage.set ( ITEMS_UBICACION, items  );
            } else {
                return this.storage.set ( ITEMS_UBICACION, [item]  );
            }
        }  );
    }

    getDirecciones (   ): Promise<DireccionItem[]> {
        return this.storage.get ( ITEMS_UBICACION  );
    }

    updateDireccion ( item: DireccionItem  ): Promise<any> {
        return this.storage.get ( ITEMS_UBICACION  ).then (  ( items: DireccionItem[]  ) => {
            if  ( !items || items.length === 0  ) {
                return null;
            }

            let newItems: DireccionItem[] = [];

            for  ( let i of items  ) {
                if  ( i.id == item.id  ) {
                    newItems.push ( item  );
                } 
                else {
                    newItems.push ( i  );
                }
            }
            return this.storage.set ( ITEMS_UBICACION, newItems  );
        }  );
    }

    deleteDireccion ( id: number  ): Promise<DireccionItem> {
        return this.storage.get ( ITEMS_UBICACION  ).then (  ( items: DireccionItem[]  ) => {
            if  ( !items || items.length === 0  ) {
                return null;
            }

            let toKeep: DireccionItem[] = [];

            for  ( let index of items  ) {
                if  ( index.id !== id  ) {
                    toKeep.push (  index   );
                }
            }
            return this.storage.set ( ITEMS_UBICACION, toKeep  );
        }  );
    }

    vaciarDirecciones (   ) {
        return this.storage.remove ( ITEMS_UBICACION  );
    }

}
