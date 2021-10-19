import { Component, OnInit, Input } from "@angular/core";
import { AlertController, IonRefresherContent, ModalController, Platform, ToastController } from "@ionic/angular";
import { ComprasStorageService, CompraItem } from "../../services/compras-storage.service";
import { ApiService } from "../../services/api.service";
import { Location } from '@angular/common';
import { ValoresStorageService, ValorItem } from '../../services/valores-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService } from 'ionic-cache';
import { PropinaStorageService } from '../../services/propina-storage.service';
import * as countdown from 'countdown';
import * as moment from 'moment';
import * as $ from 'jquery';
import { ModalmenuproductoPage } from "../../components/modalmenuproducto/modalmenuproducto.page";

interface Time {
    days: number;
    hours: number,
    minutes: number;
    seconds: number;
}

@Component({
    selector: "app-canasta",
    templateUrl: "./canasta.page.html",
    styleUrls: ["./canasta.page.scss"],
})

export class CanastaPage implements OnInit {
    cdn_site = "https://cdn.vecino.com.co/";
    imagenes: any = [];
    tendero: any = [];

    cliente;
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

    constructor(
        private modalController: ModalController,
        private apiservice: ApiService,
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
    ) {
        this.cliente = this.route.snapshot.paramMap.get("cliente");
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.cache.clearAll();
        this.suma = 0;
        this.cargarCompras();
        this.obteniendoTotal();
    }

    ionViewWillLeave() {
        this.platform.backButton.subscribe();
        this.cache.clearAll();
    }

    cargarCompras() {
        this.apicomprasStorage.getCompras().then(items => {
            this.items = items;
            // console.log(items);

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
        this.router.navigate(["/gateway-categorias", codigo]);
    }

    async eliminarCompra(item) {
        // console.log(item)
        await this.apicomprasStorage.deleteCompra(item.modified);
        this.valoresStorage.deleteValor(item.modified);
        this.presentToast("Compra eliminada!", "danger");
        await this.obteniendoTotal();
        await this.ionViewWillEnter();
    }

    async updatePlus(cantidadinput, item) {
        var cant = cantidadinput.value++;
        console.log( item )
        item.cantidad = cantidadinput.value;
        item.totalfactura = item.precio_unitario * cantidadinput.value;
        await this.apicomprasStorage.updateCompra(item).then(item => {
            this.presentToast(
                "Has agregado un producto mas a la canasta!", "success"
            );
        });
        let x = item.totalfactura * cantidadinput.value;
        this.newItem2.modified = item.modified;
        this.newItem2.codigo = item.codigo;
        this.newItem2.cantidadCompra = item.cantidad;
        this.newItem2.precioCompra = item.precio_unitario;
        this.newItem2.valorCompra = x;

        await this.valoresStorage.updateValor(this.newItem2).then(() => { });
        await this.obteniendoTotal();
        this.ionViewWillEnter();
    };

    async updateMinus(cantidadinput, item) {
        var cant = cantidadinput.value--;

        // console.log(cant)

        if (cantidadinput.value === 1) {
            cantidadinput.value == cant + 1;
            // document.getElementById("minus").style.display = "none";
        }
        if (cantidadinput.value > 1) {
            cantidadinput.value == cant + 1;
            // document.getElementById("minus").style.display = "block";
        }

        item.cantidad = cantidadinput.value;
        item.totalfactura = item.precio_unitario * cantidadinput.value;
        await this.apicomprasStorage.updateCompra(item).then(item => {
            this.presentToast(
                "Has quitado un producto mas a la canasta!", "danger"
            );
        });

        let x = item.totalfactura * cantidadinput.value;
        // console.log(x);
        this.newItem2.modified = item.modified;
        this.newItem2.codigo = item.codigo;
        this.newItem2.cantidadCompra = item.cantidad;
        this.newItem2.precioCompra = item.precio_unitario;
        this.newItem2.valorCompra = x;
        await this.valoresStorage.updateValor(this.newItem2).then(() => { });
        await this.obteniendoTotalMinus();
        this.ionViewWillEnter();
    };

    async obteniendoTotal() {
        this.cache.clearAll();
        await this.apicomprasStorage.getCompras().then(items => {
            this.valores = items;
            // console.log(this.valores)

            if (this.valores == null) {
                // return this.suma == 0;
            }

            else if (this.valores == 1) {
                // this.suma = this.valores.cantidad * this.valores.totalfactura;
                // return this.suma;
                let suma = 0;
                items.forEach(function (item) {
                    suma += item.totalfactura;
                });
                this.suma = suma;
            }

            else {
                // for (var i = 0; i < this.valores.length; i++) {
                //     this.suma += this.valores[i].cantidad * this.valores[i].totalfactura;
                // }
                // return this.suma;
                let suma = 0;
                items.forEach(function (item) {
                    suma += item.totalfactura;
                });
                this.suma = suma;
            }
        });

    }

    async obteniendoTotalMinus() {
        this.cache.clearAll();
        await this.apicomprasStorage.getCompras().then(items => {
            this.valores = items;
            // console.log(this.valores)

            if ((this.valores == null)) {
                return this.suma == 0;
            }

            if (this.valores == 1) {
                let suma = 0;
                items.forEach(function (item) {
                    suma += item.totalfactura;
                });
                this.suma = suma;
            }

            else {
                // for (var i = 0; i <= this.valores.length; i--) {
                //     this.suma -= this.valores[i].cantidad * this.valores[i].totalfactura
                // }
                // return this.suma;
                let suma = 0;
                items.forEach(function (item) {
                    suma += item.totalfactura;
                });
                this.suma = suma;
            }
        });
    }

    // ---- Mensajes Canasta ----------------------------------------------------
    async presentToast(message: string, color: string) {
        const toast = await this.toastController.create({
            message,
            color,
            duration: 2000,
            translucent: true,
            position: 'top'
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
        this.router.navigate(["/inicio"]);
    }

    iraAtras() {
        this.cache.clearAll();
        this.location.back();
    }

    cerrarModal() {
        this.cache.clearAll();
        this.router.navigate(["/gateway"]);
    }

    iraATienda() {
        this.cache.clearAll();
        let a = (document.getElementById("codTendero") as HTMLInputElement).value
        this.router.navigate(["/categoriasarticulos", this.cliente, a]);
    }


    async verMenu(producto) {
        const modal = await this.modalController.create({
            component: ModalmenuproductoPage,
            cssClass: 'my-custom-class',
            componentProps: {
                producto: producto,
                menu: producto['menu']
            }
        });
        return await modal.present();
        console.log(producto['menu'])
    }
    
    vercomentario( elemento ){
        console.log( elemento );
        $("#comentario_"+elemento).toggle("slow");
    }

}

