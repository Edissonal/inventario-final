import { Component, OnInit, Input, ElementRef, ViewChild } from "@angular/core";
import { ModalController, ToastController, Platform, LoadingController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { CacheService } from 'ionic-cache';
import { ApiService } from "src/app/services/api.service";
import { ValoresStorageService, ValorItem } from "../../services/valores-storage.service";
import { ComprasStorageService, CompraItem } from "../../services/compras-storage.service";
import { PropinaStorageService, PropinaItem } from 'src/app/services/propina-storage.service';
import { PushService } from 'src/app/services/push.service';
import { AuthguardService } from 'src/app/services/authguard.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalpedidoproductosPage } from "src/app/components/modalpedidoproductos/modalpedidoproductos.page";
import { element } from "protractor";

@Component({
    selector: "app-pedido",
    templateUrl: "./pedido.page.html",
    styleUrls: ["./pedido.page.scss"],
})
export class PedidoPage {
    cdn_site = "https://cdn.vecino.com.co/";
    imagenes: any = [];
    usuarios_tiendas: any = [];
    input: number = 500;

    /*
    * * VARIABLES TIPO ARRAY, PARA OBTENER DATOS 
    */
    direccion: any = [];
    tiendas: any = [];
    propinas: any = [];
    infocliente: any = [];
    valores: any = [];

    /*
    * * VARIABLES TIPO BOOLEAN, PARA ACTIVAR MODULOS EN LA VISTA 
    */
    activarpropina: boolean;
    mostrarpropina: boolean;
    inputPropina = 500;
    /*
    * * VARIABLES TIPO INPUT, PARA OBTENER INFORMACION ESPECIFICA 
    */
    @Input() cliente;

    /*
    * * VARIABLES TIPO INTERFAZ 
    */
    items: CompraItem[] = [];
    items2: PropinaItem[] = [];
    totalproductosacomprar: number;
    newItem: CompraItem = <CompraItem>{};
    newPropina: PropinaItem = <PropinaItem>{};
    valores2: ValorItem[] = [];
    valorItem: ValorItem = <ValorItem>{};

    item;


    /*
     * * OTRAS VARIABLES
     */
    sumaTotal: number = 0;
    _propina: number = 500;
    minus: boolean;
    comision;
    porcentaje;
    valor_propina;

    /*
     * *  VARIABLES PARA AGREGAR COMISION
     */
    rangoinicial;
    rangofinal;
    porcentajecomision;
    descripcion;


    /*
     * *  VARIABLES PARA ENVIAR PEDIDO
     */
    pedido_cod_tendero: any = [];
    pedido_estatus: any = [];
    pedido_total_factura: any = [];
    pedido_cod_articulos: any = [];
    pedido_cantidad: any = [];
    pedido_precio_unitario: any = [];
    pedido_precio_linea: any = [];
    pedido_comentario_linea: any = [];
    pedido_userIdtendero;
    // pedido_userIdcliente;

    // ----
    logs: String[] = [];
    latitude: any = 0; //latitude
    longitude: any = 0; //longitude
    address: string;
    red: boolean;

    @ViewChild('image') element;

    cod_pedido;
    icono: string;

    codigodeltendero: any = [];
    pasarelas: any = [];
    tipospagos: any = [];
    codigotipopago: any;
    envio;
    suma:number = 0;

    minpedido;
    infotendero: any = [];

    detallemenu: any = [];
    menus: any = [];
    tienda;
    menusitems: any = [];
    codigospedidolinea: any = [];
    newmenuitems: any = [];

    constructor(private modalController: ModalController,
        private api: ApiService,
        private apicomprasStorage: ComprasStorageService,
        private toastController: ToastController,
        private valoresStorage: ValoresStorageService,
        private propinaStorage: PropinaStorageService,
        private cache: CacheService,
        public pushService: PushService,
        private authService: AuthguardService,
        private platform: Platform,
        private router: Router,
        private geolocation: Geolocation,
        private route: ActivatedRoute,
        private loadingcontroller: LoadingController ) {
        this.cliente = this.route.snapshot.paramMap.get("cliente");
    }

    ionViewWillEnter() {
        this.suma = 0;
        this.icono = "assets/img/tipo_pago.png";
        this.cache.clearAll();
        this.cargarCompras();
        this.cargarDatosTienda();
        this.mostrarDireccionT();
        this.cargaPropina();
        // this.obteniendoTotal();
        this.mostrarCliente();
        this.verTiposPagoTendero();
    }

    ionViewWillLeave() {
        this.cache.clearAll();
    }

    cargarDatosTienda() {
        this.cache.clearAll();
        this.apicomprasStorage.getCompras().then(items => {
            this.items = items;
            for (let i = 0; i < 1; i++) {
                const element = this.items[i];
                this.tienda = element.codigo_tendero;
                this.api.obtenerInfoTendero(this.tienda).subscribe(data => {
                    this.usuarios_tiendas = data;
                })
            }
        });
    }

    mostrarDireccionT() {
        this.api.obtenerDireccion(this.cliente).subscribe(data => {
            this.direccion = data;
        });
    }

    mostrarCliente() {
        this.api.obtenerInfoCliente(this.cliente).subscribe(data => {
            this.infocliente = data;
        });
    }

    onChangePropina(actpropina) {
        this.activarpropina = true;
    }

    cambiar(prop) {
        let a = (document.getElementById("prop") as HTMLInputElement).value
        let aa = JSON.parse(a);
        this.agregarPropina(aa);
        this._propina = aa;
        this.sumaTotal = this.suma + aa + this.comision + this.envio;
    }

    agregarPropina(propina) {
        this.newPropina.propinaCompra = propina;
        this.propinaStorage.addPropina(this.newPropina).then(item => {
            this.newPropina = <PropinaItem>{};
            this.presentToast(
                "Has agregado tu propina al pedido!",
                "success"
            );
            this.propinaStorage.getPropinas().then(item => {
                this.propinas = item;
            });

            this.activarpropina = false;
            this.mostrarpropina = true;
            this.cache.clearAll();
            this.cargaPropina();
        });

        // let valorpropina = propina.value;
        // let parsepropina = JSON.parse(valorpropina);
        // this.agregarValor(parsepropina);
    }

    cargaPropina() {
        this.propinaStorage.getPropinas().then(items => {
            this.items2 = items;

            if (this.items2 == null) {
                return this.valor_propina == 0;
            }
            else {
                for (var i = 0; i < this.items2.length; i++) {
                    this.valor_propina = this.items2[i].propinaCompra;
                }

                return this.valor_propina;
            }
        });
        this.cache.clearAll();
    }

    eliminarPropina() {
        this.propinaStorage.vaciarStorage();
        this.presentToast("Vecino, ha retirado la propina!", "danger");
        this.ionViewWillEnter();
    }

    cargarCompras() {
        let suma = 0;
        this.apicomprasStorage.getCompras().then((items: any) => {
            this.items = items;
            items.forEach(function (item) {
                suma += JSON.parse(item.cantidad);
            });
            this.totalproductosacomprar = suma;
            for (let i = 0; i < 1; i++) {
                this.item = this.items[i].codigo_tendero;
                this.api.obtenerInfoTenderos(this.item).subscribe(info => {
                    this.envio = JSON.parse(info[0].val_domicilio);
                    this.obteniendoTotal(this.envio);
                    this.infotendero = info;
                    for (let e = 0; e < info.length; e++) {
                        let element = info[e].min_pedido;
                        this.minpedido = element;
                        return this.minpedido;
                    }
                });
                return this.item;
            }
        });
    }

    agregarValor(propina) {
        this.valorItem.valorCompra = propina;
        this.valoresStorage.addValor(this.valorItem).then(item => {
            this.valorItem = <ValorItem>{};
        });
        this.cache.clearAll();
    }

    obteniendoTotal(envio) {
        // this.cache.clearAll();
        this.apicomprasStorage.getCompras().then(items => {
            this.valores = items;
            if (this.valores == null) {
            }
            else {
                // for (var i = 0; i < this.valores.length; i++) {
                //     this.suma += this.valores[i].cantidad * this.valores[i].totalfactura;
                // }
                // this.sumaTotal = this.suma;
                let suma = 0;
                this.valores.forEach(function (item) {
                    suma += item.totalfactura;
                });
                this.suma = suma;
                this.sumaTotal = this.suma;
                this.calculandoComision(this.sumaTotal);
                this.sumaTotal += this.comision + this._propina + envio;
            }
        });
    }

    calculandoComision(sumaTotal) {
        if (sumaTotal > 4999 && sumaTotal <= 10000) {
            this.porcentaje = 800;
            this.comision = this.porcentaje;
            this.porcentajecomision = 800;
            this.rangoinicial = "$5000";
            this.rangofinal = "< $10.000";
            this.descripcion = "Se calcula que debe pagar una comisión de $800. El valor de la compra fue por un valor de $" + sumaTotal;
            this.cache.clearAll();
            return this.comision;
        }
        if (sumaTotal > 10001 && sumaTotal <= 80000) {
            this.cache.clearAll();
            this.porcentaje = 1000;
            this.comision = this.porcentaje;
            this.porcentajecomision = 1000;
            this.rangoinicial = "$10.001";
            this.rangofinal = "< $80.000";
            this.descripcion = "Se calcula que debe pagar una comisión de $1.000. El valor de la compra fue por un valor de $" + sumaTotal;
            return this.comision;
        }
        if (sumaTotal > 80001) {
            this.cache.clearAll();
            this.porcentaje = 1500;
            this.comision = this.porcentaje;
            this.porcentajecomision = 1500;
            this.rangoinicial = "$80.001";
            this.rangofinal = "En adelante";
            this.descripcion = "Se calcula que debe pagar una comisión del $1.500. El valor de la compra fue por un valor de $" + sumaTotal;
            return this.comision;
        }
    }

    async notificacionLoaderPedido(){
        const loading = await this.loadingcontroller.create({
            cssClass: 'loader-pedido',
            message: 'Estamos enviando tu pedido, este proceso puede durar un poco, por favor espera.',
            translucent: true,
            mode: "md",
            backdropDismiss: false
        });
        await loading.present();
    }

    async enviarPedido(codigo) {
        let cliente = this.cliente;
        let tendero = codigo;
        let estatus = 0;
        let propina = this.valor_propina;
        let userIdCliente = this.pushService.userId;

        if (propina == 0 || propina == undefined) {
            propina = this._propina;
        }
        else {
            propina = this.valor_propina;
        }

        let minimo_pedido = JSON.parse(this.minpedido);
        let total_factura = this.sumaTotal - this.envio;

        if (this.codigotipopago == "" || this.codigotipopago == undefined) {
            this.presentToast("¡Vecino, necesitas seleccionar un tipo de pago!", "warning");
        }
        else {
            if (this.suma < minimo_pedido) {
                this.presentToast("¡Vecino, el valor de tu compra debe ser mayor a $" + minimo_pedido, "warning");
            }
            else if (minimo_pedido == null && this.suma < 5000) {
                this.presentToast("¡Vecino, el valor de tu compra debe ser mayor a $" + minimo_pedido, "warning");
            }
            else if (total_factura >= minimo_pedido) {
                this.notificacionLoaderPedido();
                this.api.newpostPedido(cliente, tendero, estatus, total_factura, propina, this.porcentaje, this.pedido_userIdtendero, this.codigotipopago, this.envio).subscribe(async data => {
                    this.cod_pedido = data;

                    if (data) {

                        this.presentToast("¡Vecino, tu pedido ha sido solicitado!", "success");
                        this.authService.getSession().then(item => {
                            let tendero = item;
                            this.pushService.filtroUserId(tendero);
                        });

                        this.enviarComision(this.cod_pedido.codigo, tendero);
                        await this.enviarPedidoLinea(this.cod_pedido.codigo);

                        this.pedidoHecho(data);
                    }
                });
            }
        }
    }

    enviarComision(data, tendero) {
        let cod_ventas = data;
        this.api.postComision(this.rangoinicial, this.rangofinal, this.porcentaje, this.descripcion, tendero, cod_ventas).subscribe(data => {
            // console.log(data)
        });
    }

    enviarPedidoLinea(data): Promise<any[]> {
        // console.log(this.items);
        return new Promise(( resolve, reject ) => {
            for (let i = 0; i < this.items.length; i++) {
                let cod_ventas = data;
                this.tienda = this.items[i].codigo_tendero;
                this.pedido_cod_articulos = this.items[i].codigo; // Cod_articulos
                this.pedido_cantidad = this.items[i].cantidad; // Cantidad
                this.pedido_precio_unitario = this.items[i].precio_unitario; // Precio unitario
                this.pedido_precio_linea = this.items[i].precio_unitario; // Precio linea
                this.pedido_comentario_linea = this.items[i].comentarios;
    
                this.api.postPedidoLinea(this.pedido_cod_articulos, cod_ventas, this.pedido_cantidad, this.pedido_precio_unitario, this.pedido_precio_linea, this.pedido_comentario_linea).subscribe((resp: any) => {
                    this.codigospedidolinea.push( resp );
                    // Validacion si el producto tiene menu se envia al servicio para agregar
                    if (this.items[i].menu && Array.isArray(this.items[i].menu)) {
                        this.enviardetallePedidoLinea(this.items[i].menu, resp);
                    }
                });
            }
            // console.log('codigospedidolinea', this.codigospedidolinea);
            this.apicomprasStorage.vaciarStorage();
            this.valoresStorage.vaciarStorage();
            this.propinaStorage.vaciarStorage();
            resolve(this.codigospedidolinea)
        })
    }

    enviardetallePedidoLinea(menuItems, cod_pedido_linea) {
        menuItems.forEach( menuI => {
            this.api.postDetalleMenuPedidoLinea( cod_pedido_linea, menuI.codarticulo, menuI.tipo, menuI.menu  ).subscribe( resp => {
                console.log('Menu enviado', resp); 
            });
        });
    }

    tipoPago(tipo) {
        if (tipo == "-") {
            this.icono = "assets/img/pasarela/tipo_pago.png";
            this.codigotipopago = "";
            return this.icono;
        }
        else if (tipo == "1") {
            this.codigotipopago = 1;
            this.icono = "assets/img/pasarelas/efectivo.png";
            return this.icono;
        }
        else if (tipo == "2") {
            this.codigotipopago = 2;
            this.icono = "assets/img/pasarelas/data_debito.png";
            return this.icono;
        }
        else if (tipo == "3") {
            this.codigotipopago = 3;
            this.icono = "assets/img/pasarelas/data_credito.png";
            return this.icono;
        }
        else if (tipo == "4") {
            this.codigotipopago = 4;
            this.icono = "assets/img/pasarelas/nequi.png";
            return this.icono;
        }
        else if (tipo == "5") {
            this.codigotipopago = 5;
            this.icono = "assets/img/pasarelas/daviplata.png";
            return this.icono;
        }
        this.verPasarelas(tipo);
    }

    verTiposPagoTendero() {
        this.apicomprasStorage.getCompras().then(compras => {
            for (let i = 0; i <= 1; i++) {
                const tendero = compras[0].codigo_tendero;
                this.codigodeltendero = tendero;
                this.api.obtenerTiposPago(this.codigodeltendero).subscribe(data => {
                    this.tipospagos = data;
                })
            }
        });
    }

    verPasarelas(codigo) {
        this.api.obtenerPasarelasPago().subscribe(data => {
            for (let i = 0; i < data.length; i++) {
                const cod = data[i].codigo;
                const tipo = data[i].tipo;
                // console.warn( element);
                if (tipo == codigo) {
                    this.codigotipopago = cod;
                    // console.warn(this.codigotipopago);
                    return this.codigotipopago;
                }
            }
        });
    }

    // ----- Ventanas Modal ---------------------------------------------

    async vermodalproductos() {
        const modal = await this.modalController.create({
            component: ModalpedidoproductosPage,
            cssClass: 'my-custom-class',
            componentProps: {
                cliente: this.cliente
            }
        });
        return await modal.present();
    }

    async pedidoHecho(data) {
        this.loadingcontroller.dismiss();
        this.presentToast("¡Vecino, tu pedido ha sido solicitado!", "success");
        this.router.navigate(["/pedido-hecho", data.codigo, data.fecha, data.tiempoenvio, ]);
    }

    async presentToast(message: string, color: string) {
        const toast = await this.toastController.create({
            message,
            color,
            duration: 2000,
            translucent: false,
            mode: 'ios',
            position: 'top'
        });
        toast.present();
    }

    async verDireccion(direccion) {
        this.router.navigate(["/direccion", this.cliente]);
    }

    verTienda(tienda) {
        this.router.navigate(["/categorias/", this.cliente, tienda]);
    }

    cerrarModal() {
        this.router.navigate(["/canasta", this.cliente]);
    }

}