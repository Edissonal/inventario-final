import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { ProvedoresService } from '../../servicios/provedores.service';

@Component({
  selector: 'app-provedor',
  templateUrl: './provedor.component.html',
  styleUrls: ['./provedor.component.css']
})
export class ProvedorComponent implements OnInit {
  

  proveedorForm: FormGroup;
  proveedor: any;
  
  constructor(private pf: FormBuilder,
    private provedoresService: ProvedoresService) { }

  ngOnInit() {
    this.proveedorForm = this.pf.group({
      nombre_pro: ['', Validators.required],
      direccion_pro: ['', Validators.required],
      nit_pro: ['', Validators.required],
    });
  }

  onSubmit() {
    this.proveedor = this.saveProvedor();
    this.provedoresService.postprovedor(this.proveedor)
      .subscribe(newpro => {
      //  console.log(newpro);
      },
      err=> console.log(err));
  }

  saveProvedor() {
    const saveProvedor = {
      nombre_pro: this.proveedorForm.get('nombre_pro').value,
      direccion_pro: this.proveedorForm.get('direccion_pro').value,
      nit_pro: this.proveedorForm.get('nit_pro').value,
    }
    return saveProvedor;
  }
}
