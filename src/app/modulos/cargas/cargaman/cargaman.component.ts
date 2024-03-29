import { Component, OnInit } from '@angular/core';
import * as XLSX from "xlsx";
import { ConsultasService } from '../../../servicios/consultas.service';
import { MantenimientosService } from '../../../servicios/mantenimientos.service';
import * as moment from 'moment';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { HismantenimientoService } from '../../../servicios/hismantenimiento.service';
@Component({
  selector: 'app-cargaman',
  templateUrl: './cargaman.component.html',
  styleUrls: ['./cargaman.component.css']
})
export class CargamanComponent implements OnInit {

  title = 'XlsRead';
  file: File;
  arrayBuffer: any;
  filelist: any;
  datos: any[] = [];
  validacion: any;
  mensaje: any;
 
  constructor(private mantenimientosService: MantenimientosService,
    private usuariosService: UsuariosService,
    private hismantenimientoService:HismantenimientoService) { }

  ngOnInit() {
  }

  tiempo() {
    setTimeout(() => {
      this.validacion = "";
    }, 5000);
  }

  addfile(event) {
    this.file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: 'binary', cellText: false, cellDates: true });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      

      this.datos = XLSX.utils.sheet_to_json(worksheet, { raw: false, dateNF: 'yyyy-mm-dd' });

     
      for (var i = 0; i < this.datos.length; i++) {
      
          if (this.datos[i].fecha_man ===  undefined) {
            break;
            
          }else{
            this.datos[i].fecha_man = moment(this.datos[i].fecha_man).add(1, 'day').format('YYYY-MM-DD');
           }
           
      }
     
      
   
     this.cargaHman(this.datos);
     
  

      this.mantenimientosService.carmantenimiento(this.datos)
      .subscribe((res:any) => {
       // console.log(res);
        if(res.code == "404"){
          console.log('error');
          this.validacion = res.code;
          this.mensaje = res.message;
          this.tiempo();
        } else {
          console.log('esta ok');
          this.validacion = res.code;
          this.mensaje = res.message;
          this.tiempo();
        }

      },error=> console.log(<any>error));
    

    }

  
  }

  cargaHman(data: any) {

   let datos: any[] = data;
    let idusu = this.usuariosService.data.data.id_usu;
    let fec = new Date();
    let fachamo = `${fec.getFullYear()}-${fec.getMonth() + 1}-${fec.getDate()} ${fec.getHours()}:${fec.getMinutes()}:${fec.getSeconds()}`;
    let estado_hman = 'carga';
    for (var i = 0; i < this.datos.length; i++) {
    this.datos[i].id_usu = idusu;
    this.datos[i].fecha_hman = fachamo;
    this.datos[i].estado_hman = estado_hman;
   
     }
    this.hismantenimientoService.cargahistoman(datos)
      .subscribe(res => {
        console.log(res);
      });

  }
}
