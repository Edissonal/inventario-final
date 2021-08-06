import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import * as XLSX from 'xlsx'; 
import { GnecxelService } from '../../../servicios/gnecxel.service';
import { MantenimientosService } from '../../../servicios/mantenimientos.service';



@Component({
  selector: 'app-constman',
  templateUrl: './constman.component.html',
  styleUrls: ['./constman.component.css']
})
export class ConstmanComponent implements OnInit {


  termino: string;
  busquedas: [] = [];
  fileName = 'ExcelSheet.xlsx';



  constructor(private mantenimientosService: MantenimientosService,
    private fb: FormBuilder,
    private cdref: ChangeDetectorRef,
    private gnecxelService: GnecxelService
              
  ) { }
  ngOnInit() {
  }


  consultas(termino) {
    console.log(termino);
    this.mantenimientosService.getMantenimiento(termino)
      .subscribe(res => {
        console.log(res);
        this.busquedas = res['data'];
        this.cdref.detectChanges();
      }, error => {
        console.log(<any>error);
      })
  }


  exportexcel(): void {
    this.gnecxelService.exportAsExcelFile(this.busquedas, 'muestra')
  }
  
  quitar() {
  
    console.log('ejecutado');
  
    var result:any = this.busquedas.filter(function(obj:any, index){
      return obj.mantenimiento_con === 'si';
      
    })
    this.busquedas = [];

    this.busquedas =result.slice();

    console.log(this.busquedas);
  }
  
}
