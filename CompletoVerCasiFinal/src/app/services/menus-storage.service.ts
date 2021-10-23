import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

export interface MenuItem {
    modified: number;
    codarticulo: number;
    nombre: string;
    // menu: string;
}

const ITEMS_MENUS = "menus-02";

@Injectable({
    providedIn: "root",
})
export class MenusStorageService {
    constructor(private storage: Storage) { }

    addMenu(item: MenuItem): Promise<any> {
        return this.storage.get(ITEMS_MENUS).then((items: MenuItem[]) => {
            if (items) {
                items.push(item);
                return this.storage.set(ITEMS_MENUS, items);
            } else {
                return this.storage.set(ITEMS_MENUS, [item]);
            }
        });
    }

    getMenus(): Promise<MenuItem[]> {
        return this.storage.get(ITEMS_MENUS);
    }

    vaciarStorageMenu() {
        return this.storage.remove(ITEMS_MENUS);
    }
}
