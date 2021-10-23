import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { Platform, ToastController } from "@ionic/angular";
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import { ComprasStorageService, CompraItem } from "src/app/services/compras-storage.service";
import { ValoresStorageService, ValorItem } from "src/app/services/valores-storage.service";
import { CacheService } from 'ionic-cache';

@Component({
    selector: 'app-productos-detalle',
    templateUrl: './productos-detalle.page.html',
    styleUrls: ['./productos-detalle.page.scss'],
})

export class ProductosDetallePage implements OnInit {
    cdn_site = "https://cdn.vecino.com.co/";
    cliente;
    codigo;
    tendero;
    usertId;
    detallesproducto: any = [];
    tallas: any = [];
    colores: any = [];
    imagenes: any = [];
    variantes: any = [];

    talla_select = 0;
    color_select = 0;

    cantidadinput: number = 0;

    // Storage Compras
    items: CompraItem[] = [];
    newItem: CompraItem = <CompraItem>{};

    // Storage Valores
    valores: ValorItem[] = [];
    valorItem: ValorItem = <ValorItem>{};

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

    constructor(
        private api: ApiService,
        private router: Router,
        private route: ActivatedRoute,
        private toastController: ToastController,
        private location: Location,
        private apicomprasStorage: ComprasStorageService,
        private platform: Platform,
        private cache: CacheService,
        private apivaloresStorage: ValoresStorageService,
        private valoresStorage: ValoresStorageService
    ) {
        this.cliente = this.route.snapshot.paramMap.get("cliente");
        this.codigo = this.route.snapshot.paramMap.get("codigo");
        this.tendero = this.route.snapshot.paramMap.get("tendero");
        this.usertId = this.route.snapshot.paramMap.get("userIdTendero");
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
            console.log(data);
            for (let i = 0; i < data.length; i++) {
                const elem = data[i];
                this.fotoproducto = data[i].foto_sm;

                this.precio = JSON.parse(data[i].precio);

                let codigoprodu = elem.codigo;
                this.obtenerOpcionesMenuProducto(codigoprodu);
                this.obtenerMenus(codigoprodu);
            }
        });
    }


    obtenerOpcionesMenuProducto(codigo) {
        this.dia = new Date().getDay();
        this.api.obtenerOpcionesMenusArticulo(codigo).subscribe(data => {
            console.log(data)
            this.opcionesmenu = data;
        });
    }

    obtenerMenus(codigo) {
        this.dia = new Date().getDay();
        console.warn("Dia: " + this.dia);

        this.api.obtenerMenusArticulo(codigo).subscribe(data => {
            // console.log( data );

            for (let i = 0; i < data.length; i++) {
                const menudia = data[i].dia;

                if (menudia == this.dia) {
                    this.menu = data;
                }

            }
        })
    }

    opcionmenu(opmenu) {
        // this.menuseleccion.push( opmenu );
        let array = [];
        array.push(opmenu);

        for (let i = 0; i < array.length; i++) {
            let codigo = array[i];
            this.api.obtenerregistroopcionmenusArticulo(codigo).subscribe(data => {
                for (let d = 0; d < data.length; d++) {
                    let element = data[d];

                    let validador = this.menuseleccion.includes(element);
                    if (validador == false) {
                        this.menuseleccion.push(element)
                    }
                }
            });
        }

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

    // Agregado una compra
    agregarCompra(nombre, preciou, cantidadinput) {
        console.log(this.menuseleccion);
        console.log( nombre )
        console.log( this.comentario )
        console.log( cantidadinput.value )
        console.log( preciou )

        this.apicomprasStorage.getCompras().then( (items:any) => {
            this.items = items;
            //  Si existen items en storage de canasta
            if( items) {
                //  Recorre todas las compras guardadas en estora
                for (let compras = 0; compras < items.length; compras++) {
                    let codigoitem = JSON.parse(items[compras].codigo);
                    let codigo_tenderoitem = items[compras].codigo_tendero;
                    if(  codigo_tenderoitem === this.tendero ){
                        this.newItem.modified = Date.now();
                        this.newItem.codigo = this.codigo;
                        this.newItem.codigo_tendero = this.tendero;
                        this.newItem.nombre = nombre;
                        this.newItem.cantidad = cantidadinput.value;
                        this.newItem.precio_unitario = preciou;
                        this.newItem.totalfactura = preciou*cantidadinput.value;
                        this.newItem.usertId = this.usertId;
                        this.newItem.tipo = "articulos/";
                        this.newItem.fotoelemento = this.fotoproducto;
                        this.newItem.menu = this.menuseleccion;
                        this.newItem.comentarios = this.comentario;

                        this.apicomprasStorage.addCompra(this.newItem).then(item => {
                            this.newItem = <CompraItem>{};
                            this.presentToast("Has agregado un producto a la canasta!","success" );
                            this.cargarCompras();
                        });
                        this.agregarValor( this.codigo, this.newItem.cantidad, this.newItem.precio_unitario, this.newItem.totalfactura )
                    }
                    // En caso que el codigo del tendero de los elementos guardados  sea distinto al de la tienda que se visualiza
                    else {
                        this.presentToast('Estas intentando agregar productos de una tienda diferente', 'warning');
                    }
                }
            }
            // En caso que no haya items de compras guardadas en storage, realiza el guardado del producto
            if( !items) {
                this.newItem.modified = Date.now();
                this.newItem.codigo = this.codigo;
                this.newItem.codigo_tendero = this.tendero;
                this.newItem.nombre = nombre;
                this.newItem.cantidad = cantidadinput.value;
                this.newItem.precio_unitario = preciou;
                this.newItem.totalfactura = preciou*cantidadinput.value;
                this.newItem.usertId = this.usertId;
                this.newItem.tipo = "articulos/";
                this.newItem.fotoelemento = this.fotoproducto;
                this.newItem.menu = this.menuseleccion;
                this.newItem.comentarios = this.comentario;

                this.apicomprasStorage.addCompra(this.newItem).then(item => {
                    this.newItem = <CompraItem>{};
                    this.presentToast(  "Has agregado un producto a la canasta!","success");
                    this.cargarCompras();
                });
                this.agregarValor( this.codigo, this.newItem.cantidad, this.newItem.precio_unitario, this.newItem.totalfactura )
            }
            this.iraAtras();
        });
    }

    // Agregado una compra
    agregarValor(codigo, cantidadCompra, precioCompra, valorCompra) {
        this.valorItem.modified = Date.now();
        this.valorItem.codigo = codigo;
        this.valorItem.cantidadCompra = cantidadCompra;
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

            // console.warn(items)
            for (let compras = 0; compras < items.length; compras++) {
                const codigoitem = items[compras].codigo;

            }
        });
    }

    cargarTotal() {
        return this.apivaloresStorage.getValores().then(valores => {
            this.valores = valores;
        });
    }

    iraAtras() {
        this.location.back();
    }
}