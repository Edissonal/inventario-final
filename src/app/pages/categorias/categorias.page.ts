import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { CacheService } from 'ionic-cache';
import { ComprasStorageService } from 'src/app/services/compras-storage.service';
import { ValoresStorageService } from 'src/app/services/valores-storage.service';


@Component({
    selector: 'app-categorias',
    templateUrl: './categorias.page.html',
    styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {
    cdn_site = "https://cdn.vecino.com.co/";
    cliente;
    tienda;
    direccion: any = [];
    imagenes: any = [];
    categorias_: any = [];
    categoriasarticulos: any = [];
    nombretienda: any;
    direcciontienda: any;
    logotienda: any;
    imgcategorias: any = [];
    valores: any = [];
    items: any = [];
    suma: number;

    constructor(
        private api: ApiService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private comprasStorage: ComprasStorageService,
        private valoresStorage: ValoresStorageService,
        private cacheService: CacheService
    ) {
        this.cliente = this.route.snapshot.paramMap.get("cliente");
        this.tienda = this.route.snapshot.paramMap.get("tienda");
        // this.obteniendoTotal();
    }

    ngOnInit() {
        console.log('aquiii estoy');
        
    }

    ionViewWillEnter() {
        this.mostrarimagenescategorias();
        this.mostrarDireccionT();
        this.mostrarTienda();
        this.cacheService.clearAll();
        this.obteniendoTotal();
        this.suma = null;
    }

    ionViewWillLeaver() {
        this.cacheService.clearAll();
    }

    mostrarDireccionT() {
        this.api.obtenerDireccion(this.cliente).subscribe(data => {
            this.direccion = data;
        });
    }

    // ---- Ver Direccion Modal ----------------------------------------------------------------------
    async verDireccion(direccion) {
        this.router.navigate(["/direccion", this.cliente]);
    }

    mostrarTienda() {
        this.api.obtenerInfoTendero(this.tienda).subscribe(data => {
            console.log(data);

            this.nombretienda = data[0].nombretienda;
            this.direcciontienda = data[0].direccion;
            this.logotienda = this.cdn_site+'tiendas/'+data[0].fototienda;
        });
    }

    mostrarimagenescategorias() {
        // console.warn( this.tienda )
        this.api.obtenercategoriasTienda2(this.tienda).subscribe(data => {
            this.imgcategorias = data;
            console.log(data);
        });
    }

    iracategoria(codigocategoria, nombrecategoria) {
        // console.log( codigocategoria);
        this.router.navigate(["categoriasarticulos/", this.cliente, this.tienda, codigocategoria, nombrecategoria]);
    }

    atras() {
        this.location.back();
    }

    // Mostrar Canasta
    async obteniendoTotal() {
        await this.cacheService.clearAll();
        
        await this.comprasStorage.getCompras().then(items => {
            this.valores = items;
            // console.log(this.valores);
            if (items) {
                // console.log(this.valores.length);

                for (var i = 0; i < items.length; i++) {
                    let pu = items[i].precio_unitario;
                    let cant = items[i].cantidad;
                    this.suma += pu * cant;
                }
            }
            // console.warn(this.suma)
            return this.suma;
        });
    }

    verCanasta() {
        this.router.navigate(["/canasta", this.cliente]);
    }

}
