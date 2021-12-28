import { Component, OnInit } from '@angular/core';
import * as XLSX from "xlsx";
import { ConsultasService } from '../../../servicios/consultas.service';
import * as moment from 'moment';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { HisconsultasService } from '../../../servicios/hisconsultas.service';

@Component({
  selector: 'app-cargaconsult',
  templateUrl: './cargaconsult.component.html',
  styleUrls: ['./cargaconsult.component.css']
})
export class CargaconsultComponent implements OnInit {

  title = 'XlsRead';
  file:File
  arrayBuffer:any
  filelist: any
  datos: any[] = [];
  validacion: any;
  mensaje: any;

  constructor(private consultasService:ConsultasService,
              private usuariosService: UsuariosService,
              private hisconsultasService:HisconsultasService) { }

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
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.datos = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(this.datos);

      
     let idusu = this.usuariosService.data.data.id_usu;
     let fec = new Date();
     let fachamo = `${fec.getFullYear()}-${fec.getMonth() + 1}-${fec.getDate()}`;
     let estado_hcon = 'carga';
     for (var i = 0; i < this.datos.length; i++) {
     this.datos[i].id_usu = idusu;
     this.datos[i].fecha_hcon = fachamo;
     this.datos[i].estado_hcon = estado_hcon;
    
      }

      //this.cargaHcon(this.datos);
      console.log(this.datos);

           
      this.consultasService.cargaConsul(this.datos)
      .subscribe((res:any) => {
        if (res.code == "404") {
          console.log("error");
          this.validacion = res.code;
          this.mensaje = res.message;
          this.tiempo();
         

        } else {
          console.log("esta ok");
         this.mensaje = res.message;
         this.validacion = res.code;
         this.tiempo(); 
        
          
     }
       
      }, (error) => console.log(<any>error));
    }
  }

  /*cargaHcon(data: any) {

    let datos: any[] = data;
     let idusu = this.usuariosService.data.data.id_usu;
     let fec = new Date();
     let fachamo = `${fec.getFullYear()}-${fec.getMonth() + 1}-${fec.getDate()}`;
     let estado_hcon = 'carga';
     for (var i = 0; i < this.datos.length; i++) {
     this.datos[i].id_usu = idusu;
     this.datos[i].fecha_hcon = fachamo;
     this.datos[i].estado_hcon = estado_hcon;
    
      }
     this.hisconsultasService.cargahistocon(datos)
       .subscribe(res => {
         console.log(res);
       });
 
   }*/

}
