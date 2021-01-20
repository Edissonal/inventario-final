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
  estado: boolean = false;

  constructor(private consultasService:ConsultasService) { }

  ngOnInit() {
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
      .subscribe(res => {
        console.log(res);
        this.estado = true;
      }, (error) =>
      
        console.log(error.error.Message)
      
        );
    }
  }

}
