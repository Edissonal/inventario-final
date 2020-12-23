import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { UbicacionService } from '../../../servicios/ubicacion.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editubicacion',
  templateUrl: './editubicacion.component.html',
  styleUrls: ['./editubicacion.component.css']
})
export class EditubicacionComponent implements OnInit {

  formaForm: FormGroup;
  ubicacion: any;
  id_ubi: any;
  showView:boolean = false;
  constructor(private fb: FormBuilder,
              private ubicacionService: UbicacionService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { 
              this.crearFormulario(); 
               
    this.activatedRoute.params
      .subscribe(parametros => {
        this.id_ubi = parametros['id'];
        this.ubicacionService.getUbicacionn(this.id_ubi)
          .subscribe(res => {
            this.ubicacion = res['data']
            this.showView = true;
          });
      });
    
    
  }

  get nombreNovalido() {
    return this.formaForm.get('nombre_ubi').invalid && this.formaForm.get('nombre_ubi').touched;
  }

  ngOnInit() {
  }

  crearFormulario() { 

    this.formaForm = this.fb.group({
      nombre_ubi: ['', [Validators.required,Validators.minLength(4)]],
     });
  }

  onSubmit() {
    if (this.formaForm.invalid) {
      
      Object.values(this.formaForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }
    this.ubicacion = this.saveUbicacion();
    this.ubicacionService.putubicacion(this.ubicacion,this.id_ubi)
      .subscribe(newpro => { 
        console.log(newpro);
         this.router.navigate(['consultarubi']);
      }, error => console.log(<any>error));
     
  }

  saveUbicacion() {
    const saveUbicacion = {
      nombre_ubi: this.formaForm.get('nombre_ubi').value,
    }
    return saveUbicacion;
  }

}
