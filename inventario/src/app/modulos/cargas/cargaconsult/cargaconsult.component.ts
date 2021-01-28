import { Component, OnInit } from '@angular/core';
import * as XLSX from "xlsx";
import { ConsultasService } from '../../../servicios/consultas.service';

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

  constructor(private consultasService:ConsultasService) { }

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
     
      this.consultasService.cargaConsul(this.datos)
      .subscribe((res:any) => {
        if (res.code == "404") {
          console.log("quepasa aqui");
          this.validacion = res.code;
          this.mensaje = res.message;
          this.tiempo();
         

        } else {
          console.log("esta ok");
         this.mensaje = res.message;
         this.validacion = res.code;
         this.tiempo(); 
        
          
     }
       
      }, (error) =>
      
        console.log(error)
      
        );
    }
  }

}
