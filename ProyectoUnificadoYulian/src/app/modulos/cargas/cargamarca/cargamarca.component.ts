import { Component, OnInit } from '@angular/core';
import { UploadmarcaService } from 'src/app/servicios/uploadmarca.service';
import * as XLSX from "xlsx";

@Component({
  selector: 'app-cargamarca',
  templateUrl: './cargamarca.component.html',
  styleUrls: ['./cargamarca.component.css']
})
export class CargamarcaComponent implements OnInit {

  title = 'XlsRead';
  file:File
  arrayBuffer:any
  filelist: any
  uplomarca: any[] = [];

  constructor(private upload:UploadmarcaService) { }

  ngOnInit() {
  }

  addfile(event)     
  {    
  this.file= event.target.files[0];     
  let fileReader = new FileReader();    
  fileReader.readAsArrayBuffer(this.file);     
  fileReader.onload = (e) => {    
      this.arrayBuffer = fileReader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      var arr = new Array();    
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
      var workbook = XLSX.read(bstr, {type:"binary"});    
      var first_sheet_name = workbook.SheetNames[0];    
      var worksheet = workbook.Sheets[first_sheet_name];    
      this.uplomarca = XLSX.utils.sheet_to_json(worksheet, { raw: true }); 
     
   
    this.upload.postuplomarca(this.uplomarca)
      .subscribe(res => {
        console.log(res);
      },error=> console.log(<any>error));
    
    
  }    
} 

}
