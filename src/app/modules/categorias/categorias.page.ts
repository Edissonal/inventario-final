import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ComprasStorageService } from 'src/app/services/compras-storage.service';
import { ValoresStorageService } from 'src/app/services/valores-storage.service';
import { CacheService } from 'ionic-cache';


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
    direcciontienda:any;
    direcciontenda: any;
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
        private cache: CacheService
    ) {
        this.tienda = this.route.snapshot.paramMap.get("codigo");
        // console.log(this.tienda);
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.cache.clearAll();
        this.mostrarTienda();
        this.mostrarimagenescategorias();
        this.obteniendoTotal();
        this.suma = null;
    }

    ionViewWillLeave(){
        this.cache.clearAll();
    }

    mostrarTienda() {
        this.api.obtenerInfoTendero(this.tienda).subscribe(data => {
            console.log(data[0]);
            this.direcciontienda = data[0].direccion;
            this.nombretienda = data[0].nombretienda;
            this.logotienda = this.cdn_site+'tiendas/'+data[0].fototienda;
        });
    }

    mostrarimagenescategorias() {
        this.api.obtenercategoriasTienda2(this.tienda).subscribe(data => {
            this.imgcategorias = data;
        });
    }

    iracategoria(codigocategoria, nombrecategoria) {
        this.router.navigate(["gateway-productos/", this.tienda, codigocategoria, nombrecategoria]);
    }

    atras() {
        this.location.back();
    }

    async obteniendoTotal() {
        this.comprasStorage.getCompras().then(items => {
            this.valores = items;
            console.log(this.valores);
            if (items) {
                console.log(this.valores.length);

                for (var i = 0; i < items.length; i++) {
                    let pu = items[i].precio_unitario;
                    let cant = items[i].cantidad;
                    this.suma += pu * cant;
                }
            }
            return this.suma;
        });
    }

    verCanasta() {
        this.router.navigate(["/gateway-canasta"]);
    }

}
