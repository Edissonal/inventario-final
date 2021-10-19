import { Component, OnInit, Input } from "@angular/core";
import { AlertController, IonRefresherContent, ModalController, Platform, ToastController } from "@ionic/angular";
import { ComprasStorageService, CompraItem } from "../../services/compras-storage.service";
import { ApiService } from "../../services/api.service";
import { Location } from '@angular/common';
import { ValoresStorageService, ValorItem } from 'src/app/services/valores-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from 'ionic-cache';
import { PropinaStorageService } from 'src/app/services/propina-storage.service';
import * as countdown from 'countdown';
import * as moment from 'moment';
import * as $ from 'jquery';
import { AuthguardService } from "src/app/services/authguard.service";
import { DetallemenuproductopagePage } from "../detallemenuproductopage/detallemenuproductopage.page";
import { DetallemenupedidoproductoPage } from "../detallemenupedidoproducto/detallemenupedidoproducto.page";

interface Time {
    days: number;
    hours: number,
    minutes: number;
    seconds: number;
}

@Component({
    selector: 'app-modalpedidoproductos',
    templateUrl: './modalpedidoproductos.page.html',
    styleUrls: ['./modalpedidoproductos.page.scss'],
})
export class ModalpedidoproductosPage implements OnInit {
    @Input('cliente') cliente;
    cdn_site = "https://cdn.vecino.com.co/";
    imagenes: any = [];
    tendero: any = [];

    suma = 0;
    tiendas: any = [];
    valores: any = [];
    cantidadinput: number = 0;
    items: CompraItem[] = [];
    newItem: CompraItem = <CompraItem>{};

    items2: ValorItem[] = [];
    newItem2: ValorItem = <ValorItem>{};

    // -----
    @Input() date2: Date | string;
    time2: Time = null;
    timerId2: number = null;

    menus:any = [];

    constructor(
        private modalController: ModalController,
        private apiservice: ApiService,
        private authservice: AuthguardService,
        private location: Location,
        private apicomprasStorage: ComprasStorageService,
        private valoresStorage: ValoresStorageService,
        private propinaStorage: PropinaStorageService,
        private toastController: ToastController,
        private alertController: AlertController,
        private cache: CacheService,
        private router: Router,
        private platform: Platform,
        private route: ActivatedRoute
    ) {    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.suma = 0;
        this.cargarCompras();
        this.obtenerTiendas();
        this.obteniendoTotal();
        // this.verImagenes();
        // this.verBtnMenu();
    }

    ionViewWillLeave() {
        this.platform.backButton.subscribe();
        this.cache.clearAll();
    }

    obtenerTiendas() {
        this.apiservice.obtenerTodasTiendas().subscribe(data => {
            this.tiendas = data;
        });
    }

    cargarCompras() {
        this.apicomprasStorage.getCompras().then(items => {
            this.items = items;
            console.log(items);

            if (items.length > 0) {
                // console.warn( items.length );
            }
            else {
                this.vaciarCanasta();
                this.cerrarModal();
                this.presentToast("¡Has vaciado tu canasta!", "danger");
                // console.warn( items.length );
            }

            for (let i = 0; i < 1; i++) {
                const element = this.items[i];
                let codtendero = element.codigo_tendero;
                this.nombretienda(codtendero);
            }
        });
    }

    nombretienda(tendero) {
        this.apiservice.obtenerInfoTenderos(tendero).subscribe(data => {
            this.tendero = data;
        })
    }

    vertienda(codigo) {
        if (this.cliente != '' || this.cliente != null) {
            this.router.navigate(["/categorias", this.cliente, codigo]);
        }
        else {
            this.router.navigate(["/gateway-categorias", codigo]);
        }
    }

    // Modificando Compras
    async eliminarCompra(item) {
        await this.apicomprasStorage.deleteCompra(item.codigo).then(item => {
            this.presentToast("Compra eliminada!", "danger");
        });

        await this.valoresStorage.deleteValor(item.codigo).then(item => {
            this.presentToast("Valor eliminado!", "danger");
        });

        await this.cargarCompras();
        await this.ionViewWillEnter();

    }


    //  Sumador Cantidad Productos
    async updatePlus(cantidadinput, item) {
        var cant = cantidadinput.value++;

        if (cantidadinput.value == 1) {
            document.getElementById("minus").style.display = "none";
        }
        if (cantidadinput.value > 1) {
            document.getElementById("minus").style.display = "block";
        }

        item.modified = Date.now();
        item.cantidad = cantidadinput.value;
        await this.apicomprasStorage.updateCompra(item).then(item => {
            this.presentToast(
                "Has agregado un producto mas a la canasta!", "success"
            );
        });
        let x = item.totalfactura * cantidadinput.value;
        // console.log(x);
        this.newItem2.codigo = item.codigo;
        this.newItem2.cantidadCompra = item.cantidad;
        this.newItem2.precioCompra = item.precio_unitario;
        this.newItem2.valorCompra = x;

        await this.valoresStorage.updateValor(this.newItem2).then(item => { });
        await this.obteniendoTotal();
        await this.ionViewWillEnter();
    };

    async updateMinus(cantidadinput, item) {
        var cant = cantidadinput.value--;

        if (cantidadinput.value == 1) {
            document.getElementById("minus").style.display = "none";
        }
        if (cantidadinput.value > 1) {
            document.getElementById("minus").style.display = "block";
        }

        item.modified = Date.now();
        item.cantidad = cantidadinput.value;
        await this.apicomprasStorage.updateCompra(item).then(item => {
            this.presentToast(
                "Has quitado un producto mas a la canasta!", "danger"
            );
        });

        let x = item.totalfactura * cantidadinput.value;
        // console.log(x);
        this.newItem2.codigo = item.codigo;
        this.newItem2.cantidadCompra = item.cantidad;
        this.newItem2.precioCompra = item.precio_unitario;
        this.newItem2.valorCompra = x;
        await this.valoresStorage.updateValor(this.newItem2).then(item => { });
        await this.obteniendoTotalMinus();
        await this.ionViewWillEnter();
    };

    async obteniendoTotal() {
        await this.valoresStorage.getValores().then(items => {
            this.valores = items;
            // console.log(this.valores)

            if (this.valores == null) {
                // return this.suma == 0;
            }

            if (this.valores == 1) {
                this.suma = this.valores.cantidadCompra * this.valores.precioCompra;
                // return this.suma;
            }

            else {
                for (var i = 0; i < this.valores.length; i++) {
                    this.suma += this.valores[i].cantidadCompra * this.valores[i].precioCompra;
                }
                return this.suma;
            }
        });
    }

    async obteniendoTotalMinus() {
        await this.valoresStorage.getValores().then(items => {
            this.valores = items;
            // console.log(this.valores)

            if ((this.valores == null)) {
                return this.suma == 0;
            }

            if (this.valores == 1) {
                this.suma = this.valores.cantidadCompra * this.valores.precioCompra;
            }

            else {
                for (var i = 0; i <= this.valores.length; i--) {
                    this.suma -= this.valores[i].cantidadCompra * this.valores[i].precioCompra
                    return this.suma;
                }
            }
        });
    }

    obteniendoValoresCanasta() {
        this.valoresStorage.getValores().then(items => {
            this.valores = items;
        });
    }

    // ---------------

    cerrarModal() {
        this.router.navigate(["/pedido", this.cliente, 'prev']);
    }

    // verImagenes() {
    //     this.apiservice.obtenerImagenes().subscribe(data => {
    //         this.imagenes = data;
    //     })
    // }

    // ---- Mensajes Canasta ----------------------------------------------------
    async presentToast(message: string, color: string) {
        const toast = await this.toastController.create({
            message,
            color,
            duration: 2000,
            translucent: true,
        });
        toast.present();
    }

    // ---- Eliminar canasta -------------------------------------------------------------------------
    async eliminarCarrito() {
        const alert = await this.alertController.create({
            cssClass: "my-custom-class",
            header: "Vaciar canasta",
            message: "¿Vecino, de verdad quieres vaciar tu canasta?",
            buttons: [
                {
                    text: "No",
                    role: "cancel",
                    cssClass: "danger",
                    handler: (blah) => {
                    },
                },
                {
                    text: "Si",
                    cssClass: "primary",
                    handler: () => {
                        this.vaciarCanasta();
                        this.cerrarModal();
                        this.presentToast("¡Has vaciado tu canasta!", "danger");
                    },
                },
            ],
        });

        alert.present();
    }

    vaciarCanasta() {
        this.cache.clearAll();
        this.apicomprasStorage.vaciarStorage();
        this.valoresStorage.vaciarStorage();
        this.propinaStorage.vaciarStorage();
    }

    // -----------------------------------------
    actualizar() {
        let now = moment().add('120', 'm');
        this.timerId2 = countdown(now, (ts) => {
            this.time2 = ts;
            this.cache.setDefaultTTL(6 * 6);
            this.ionViewWillEnter();
        }, countdown.HOURS | countdown.MINUTES | countdown.SECONDS);
    }

    irAPedido() {
        this.cache.clearAll();
        this.router.navigate(["/pedido", this.cliente]);
    }


    iraAtras() {
        this.location.back();
    }

    cerrar() {
        console.log(this.cliente)
        // this.router.navigate(["/pedido", this.cliente, 'prev']);
        this.modalController.dismiss();
    }

    vercanasta() {
        this.modalController.dismiss();
        this.authservice.getSession().then((item: any) => {
            let cliente = JSON.parse(item);
            this.router.navigate(["/canasta", cliente]);
        });
    }

    // verBtnMenu() {
    //     this.apiservice.obtenermenuproductos().subscribe(data => {
    //         console.log(data);
    //         // this.menus = data;
    //     });
    // }

    async vermenuproducto( nombre, tipo, menu, i, comentario, cantidad ) {
        const modapagel = await this.modalController.create({
            component: DetallemenupedidoproductoPage,
            cssClass: 'my-custom-class',
            componentProps: {
                nombre: nombre,
                tipomenu: tipo,
                menu: menu,
                numeroitem: i,
                comentarios: comentario,
                cantidad: cantidad
            }
        });
        return await modapagel.present();
    }

}
