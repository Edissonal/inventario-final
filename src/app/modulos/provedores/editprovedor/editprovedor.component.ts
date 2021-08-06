import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { ProvedoresService } from '../../../servicios/provedores.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-editprovedor',
  templateUrl: './editprovedor.component.html',
  styleUrls: ['./editprovedor.component.css']
})
export class EditprovedorComponent implements OnInit {

  formaForm: FormGroup;
  proveedor: any;
  id_pro: any;
  showView:boolean = false;
  constructor(private fb: FormBuilder,
              private provedoresService: ProvedoresService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { 
              this.crearFormulario(); 
               
    this.activatedRoute.params
      .subscribe(parametros => {
        this.id_pro = parametros['id'];
        this.provedoresService.getProveedorr(this.id_pro)
          .subscribe(res => {
            this.proveedor = res['data']
            this.showView = true;
          });
      });
    
    
  }

  get nombreNovalido() {
    return this.formaForm.get('nombre_pro').invalid && this.formaForm.get('nombre_pro').touched;
  }

  get nitNovalido() {
    return this.formaForm.get('nit_pro').invalid && this.formaForm.get('nit_pro').touched;
  }

  ngOnInit() {
    
  }

  crearFormulario() { 

    this.formaForm = this.fb.group({
      nombre_pro: ['', [Validators.required,Validators.minLength(5)]],
      nit_pro: ['', [Validators.required,Validators.minLength(9)]],
     });
  }
  onSubmit() {
    if (this.formaForm.invalid) {
      
      Object.values(this.formaForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }
    this.proveedor = this.saveProvedor();
    this.provedoresService.putprovedor(this.proveedor,this.id_pro)
      .subscribe(newpro => { 
        console.log(newpro);
         this.router.navigate(['/auth/consprovedor']);
      }, error => console.log(<any>error));
     
  }

  saveProvedor() {
    const saveProvedor = {
      nombre_pro: this.formaForm.get('nombre_pro').value,
      nit_pro: this.formaForm.get('nit_pro').value,
    }
    return saveProvedor;
  }
 
}
