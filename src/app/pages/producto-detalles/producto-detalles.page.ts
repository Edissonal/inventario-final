import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { IonTextarea, ModalController, Platform, ToastController } from "@ionic/angular";
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { ComprasStorageService, CompraItem } from "src/app/services/compras-storage.service";
import { MenusStorageService, MenuItem } from "src/app/services/menus-storage.service";
import { ValoresStorageService, ValorItem } from "src/app/services/valores-storage.service";
import { CacheService } from 'ionic-cache';
import { ModalcomentariospedidoPage } from './../../components/modalcomentariospedido/modalcomentariospedido.page';
import * as $ from 'jquery';

@Component({
    selector: "app-producto-detalles",
    templateUrl: "./producto-detalles.page.html",
    styleUrls: ["./producto-detalles.page.scss"],
})

export class ProductoDetallesPage implements OnInit {
    @ViewChild(IonTextarea) ionTextTarea: IonTextarea;

    cdn_site = "https://cdn.vecino.com.co/";
    cliente;
    codigo;
    tendero;
    usertId;
    codcat;
    codsub;
    detallesproducto: any = [];
    tallas: any = [];
    colores: any = [];
    imagenes: any = [];
    variantes: any = [];
    ruta;

    talla_select = 0;
    color_select = 0;

    cantidadinput: number = 0;

    // Storage Compras
    items: CompraItem[] = [];
    newItem: CompraItem = <CompraItem>{};

    // Storage Valores
    valores: ValorItem[] = [];
    valorItem: ValorItem = <ValorItem>{};
    
    // Storage Menus
    menuitems: MenuItem[] = [];
    menunewItem: MenuItem = <MenuItem>{};

    cant: number;
    cant2: number;
    precio: number;
    minus: boolean;

    valores2: any = [];
    items2: any = [];
    suma: number;

    //  Menu
    dia;
    menu: any = [];
    opcionesmenu: any = [];

    menuseleccion: any = [];
    oproducto: any = [];
    omenu: any = [];
    comentario = null;
    valorRepetido = null;
    fotoproducto: string;
    menutodos: any = [];
    opcionesmenusindia: any = [];

    selecciondia: any;
    seleccionmenudia: any = [];
    selecciontodosdias: any = [];
    menuarraySeleccion:any = [];

    constructor(
        private api: ApiService,
        private router: Router,
        private route: ActivatedRoute,
        private toastController: ToastController,
        private location: Location,
        private platform: Platform,
        private keyboard: Keyboard,
        private _modalController: ModalController,
        private apicomprasStorage: ComprasStorageService,
        private apimenusStorage: MenusStorageService,
        private cache: CacheService,
        private apivaloresStorage: ValoresStorageService,
        private valoresStorage: ValoresStorageService
    ) {
        this.cliente = this.route.snapshot.paramMap.get("cliente");
        this.codigo = this.route.snapshot.paramMap.get("codigo");
        this.tendero = this.route.snapshot.paramMap.get("idtienda");
        this.usertId = this.route.snapshot.paramMap.get("userIdTendero");
        this.codcat = this.route.snapshot.paramMap.get("codcat");
        this.codsub = this.route.snapshot.paramMap.get("codsub");
        this.ruta = this.route.snapshot.paramMap.get("ruta");
        // console.log(this.comentario);
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.verProducto();
        this.cant2 = 1;
    }

    ionViewWillLeave() {
        this.platform.backButton.subscribe();
        this.cargarTotal();
        this.cargarCompras();
    }

    // ---- Mensajes Canasta ----------------------------------------------------
    async presentToast(message: string, color: string) {
        const toast = await this.toastController.create({
            message,
            color,
            duration: 2000,
            translucent: false,
            position: 'top'
        });
        toast.present();
    }


    // --------- Ver informacion del producto
    verProducto() {
        this.api.obtenerArticulo(this.codigo, this.tendero).subscribe(data => {
            this.detallesproducto = data;
            // console.log(data);
            for (let i = 0; i < data.length; i++) {
                const elem = data[i];
                this.fotoproducto = data[i].foto_sm;

                this.precio = JSON.parse(data[i].precio);

                let codigoprodu = elem.codigo;
                this.obtenerOpcionesMenuProducto(codigoprodu);
                this.obtenerMenus(codigoprodu);
                this.obtenerMenuTodosDias(codigoprodu)
            }
        });
    }

    obtenerOpcionesMenuProducto(codigo) {
        this.dia = new Date().getDay();
        this.api.obtenerOpcionesMenusArticulo(codigo).subscribe(data => {
            console.log(data)
            this.opcionesmenu = data;
        });
        this.obtenerOpcionesMenuProductosindia(codigo);
    }

    obtenerOpcionesMenuProductosindia(codigo) {
        this.api.obtenerOpcionesMenusArticuloSinDia(codigo).subscribe(data => {
            this.opcionesmenusindia = data;
            console.log(data)
        });
    }

    obtenerMenus(codigo) {
        this.dia = new Date().getDay();
        console.warn("Dia: " + this.dia);

        this.api.obtenerMenusArticulo(codigo).subscribe(data => {
            this.menu = data;
            console.log(this.menu);
        })
    }

    obtenerMenuTodosDias(codigo) {
        this.api.obtenerMenuTodosDias(codigo).subscribe(data => {
            this.menutodos = data;
            console.log(this.menutodos)
        });
    }

    comentarios(com) {
        this.comentario = com.value;
    }

    //  --------- Mostrar colores --------------------
    busqueda() {
        this.router.navigate(["/busqueda", this.cliente]);
    }

    cantidad(cantidad) {
        this.cant2 = cantidad;
        return this.cant2;
        // console.warn(this.cant2);
    }

    contadormas(cantidadI) {
        this.cant = cantidadI.value++;
        if (this.cant == 1 || this.cant2 == 1) {
            this.minus = false;
        }
        if (this.cant >= 2 || this.cant2 >= 2) {
            this.minus = true;
        }
        return this.cant;
    }

    contadormenos(cantidadI) {
        this.cant = cantidadI.value--;
        if (this.cant == 1 || this.cant2 == 1) {
            this.minus = false;
        }
        if (this.cant >= 2 || this.cant2 >= 2) {
            this.minus = true;
        }
        return this.cant;
    }

    seleccionarmenudia( value, tipo, menu ) {
        var repetido = false;
        let codarticulo = this.codigo;
        this.selecciontodosdias.push({ codarticulo, value, tipo, menu })

        for (var i = 0; i < this.seleccionmenudia.length; i++) {
            for (var j = 0; j < this.seleccionmenudia.length; j++) {
                if (this.seleccionmenudia[i].tipo == this.seleccionmenudia[j].tipo && i != j) { //revisamos que i sea diferente de j, para que no compare el mismo elemento exacto.
                    let removed = this.seleccionmenudia.splice( i , 1);
                    repetido = true;
                }
            }
        }
        return this.seleccionmenudia;

    }

    seleccionarmenutodosdias(value, tipo, menu) {
        var repetido = false;
        let codarticulo = this.codigo;
        this.selecciontodosdias.push({ codarticulo, value, tipo, menu })

        for (var i = 0; i < this.selecciontodosdias.length; i++) {
            for (var j = 0; j < this.selecciontodosdias.length; j++) {
                if (this.selecciontodosdias[i].tipo == this.selecciontodosdias[j].tipo && i != j) { //revisamos que i sea diferente de j, para que no compare el mismo elemento exacto.
                    let removed = this.selecciontodosdias.splice( i , 1);
                    repetido = true;
                }
            }
        }
        
        return this.selecciontodosdias;
    }

    // Agregado una compra
    agregarCompra(nombre, preciou, cantidadinput) {
        var repetido = false;
        this.menuseleccion = this.seleccionmenudia.concat( this.selecciontodosdias );

        for (var i = 0; i < this.menuseleccion.length; i++) {
            for (var j = 0; j < this.menuseleccion.length; j++) {
                if (this.menuseleccion[i].tipo == this.menuseleccion[j].tipo && i != j) { //revisamos que i sea diferente de j, para que no compare el mismo elemento exacto.
                    let removed = this.menuseleccion.splice( i , 1);
                    let codigoremovido = removed[0].value;

                    let code = "#"+codigoremovido;
                    console.log(code)
                    $(code).prop('checked', false);
                    repetido = true;
                }
            }
        }

        this.apicomprasStorage.getCompras().then((items: any) => {
            this.items = items;
            //  Si existen items en storage de canasta
            if (items) {
                //  Recorre todas las compras guardadas en estora
                for (let compras = 0; compras < items.length; compras++) {
                    let codigoitem = JSON.parse(items[compras].codigo);
                    let codigo_tenderoitem = items[compras].codigo_tendero;
                    if (codigo_tenderoitem === this.tendero) {
                        this.newItem.modified = Date.now();
                        this.newItem.codigo = this.codigo;
                        this.newItem.codigo_tendero = this.tendero;
                        this.newItem.nombre = nombre;
                        this.newItem.cantidad = JSON.parse(cantidadinput.value);
                        this.newItem.precio_unitario = preciou;
                        this.newItem.totalfactura = preciou * cantidadinput.value;
                        this.newItem.usertId = this.usertId;
                        this.newItem.tipo = "articulos/";
                        this.newItem.fotoelemento = this.fotoproducto;
                        this.newItem.menu = this.menuseleccion;
                        this.newItem.comentarios = this.comentario;
                       
                        // this.apimenusStorage.addMenu(this.menuseleccion).then( item =>{
                        //     // this.menunewItem;
                        // });

                        this.apicomprasStorage.addCompra(this.newItem).then(item => {
                            this.newItem = <CompraItem>{};
                            this.presentToast("Has agregado un producto a la canasta!", "success");
                            this.cargarCompras();
                        });

                        // this.menunewItem.codigo = this.codigo;
                        // this.menunewItem.nombre = nombre;
                        // this.menunewItem.menu = this.menuseleccion;

                        

                        this.agregarValor(this.codigo, this.newItem.cantidad, this.newItem.precio_unitario, this.newItem.totalfactura)
                    }
                    // En caso que el codigo del tendero de los elementos guardados  sea distinto al de la tienda que se visualiza
                    else {
                        this.presentToast('Estas intentando agregar productos de una tienda diferente', 'warning');
                    }
                }
            }
            // En caso que no haya items de compras guardadas en storage, realiza el guardado del producto
            if (!items) {
                this.newItem.modified = Date.now();
                this.newItem.codigo = this.codigo;
                this.newItem.codigo_tendero = this.tendero;
                this.newItem.nombre = nombre;
                this.newItem.cantidad = JSON.parse(cantidadinput.value);
                this.newItem.precio_unitario = preciou;
                this.newItem.totalfactura = preciou * cantidadinput.value;
                this.newItem.usertId = this.usertId;
                this.newItem.tipo = "articulos/";
                this.newItem.fotoelemento = this.fotoproducto;
                this.newItem.menu = this.menuseleccion;
                this.newItem.comentarios = this.comentario;

                // this.apimenusStorage.addMenu(this.menuseleccion).then( item =>{
                //     // this.menunewItem = {};
                // });

                this.apicomprasStorage.addCompra(this.newItem).then(item => {
                    this.newItem = <CompraItem>{};
                    this.presentToast("Has agregado un producto a la canasta!", "success");
                    this.cargarCompras();
                });

                this.agregarValor(this.codigo, this.newItem.cantidad, this.newItem.precio_unitario, this.newItem.totalfactura)
            }
            this.iraAtras();
        });
    }

    // Agregado una compra
    agregarValor(codigo, cantidadCompra, precioCompra, valorCompra) {
        this.valorItem.modified = Date.now();
        this.valorItem.codigo = codigo;
        this.valorItem.cantidadCompra = JSON.parse(cantidadCompra);
        this.valorItem.precioCompra = precioCompra;
        this.valorItem.valorCompra = precioCompra * cantidadCompra;

        this.apivaloresStorage.addValor(this.valorItem).then(item => {
            this.valorItem = <ValorItem>{};
            this.cargarTotal();
        });
    }

    // Cargando Compras
    cargarCompras() {
        this.apicomprasStorage.getCompras().then(items => {
            this.items = items;
            if (items) {
                for (let compras = 0; compras < items.length; compras++) {
                    const codigoitem = items[compras].codigo;

                }
            }
        });
    }

    cargarTotal() {
        return this.apivaloresStorage.getValores().then(items => {
            this.valores = items;
        });
    }

    iraAtras() {
        this.location.back();
    }

    async mostrarModalComentarios() {
        // console.log(this.comentario);

        if (this.comentario == null) {
            const modal = await this._modalController.create({
                component: ModalcomentariospedidoPage,
                cssClass: 'my-custom-class'
            });
            await modal.present();
            const { data } = await modal.onWillDismiss();
            this.comentario = data['comentario'];
        }
        else {
            const modal = await this._modalController.create({
                component: ModalcomentariospedidoPage,
                cssClass: 'my-custom-class',
                componentProps: {
                    comentario: this.comentario
                }
            });
            await modal.present();
            const { data } = await modal.onWillDismiss();
            this.comentario = data['comentario'];
        }
    }

    

}

