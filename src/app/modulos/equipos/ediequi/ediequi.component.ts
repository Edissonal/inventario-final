import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EquiposService } from '../../../servicios/equipos.service';


@Component({
  selector: 'app-ediequi',
  templateUrl: './ediequi.component.html',
  styleUrls: ['./ediequi.component.css']
})
export class EdiequiComponent implements OnInit {

  formaForm: FormGroup;
  equipo: any;
  id_equi: any;
  showView:boolean = false;

  constructor(private fb: FormBuilder,
              private equiposService: EquiposService,
              private router: Router,
              private activateRoute: ActivatedRoute) {
              this.crearFormulario(); 
    this.activateRoute.params
      .subscribe(parametros => {
        this.id_equi = parametros['id'];
        this.equiposService.getequipo(this.id_equi)
          .subscribe(res=>{
            this.equipo = res['data'];
            console.log(this.equipo);
            this.showView = true;
          });
      });
    
    
               }

  ngOnInit() { }

  get equipoNovalido() {
    return this.formaForm.get('nombre_equi').invalid && this.formaForm.get('nombre_equi').touched;
  }
  
  crearFormulario() {
    this.formaForm = this.fb.group({
      nombre_equi: ['', [Validators.required, Validators.minLength(5)]]
    });

  }

  onSubmit() {
    if (this.formaForm.invalid) {
      Object.values(this.formaForm.controls).forEach(control => {
        control.markAllAsTouched();   
      });
      return;
    }
    this.equipo = this.saveEquipo();
    this.equiposService.putequipo(this.equipo,this.id_equi)
      .subscribe(newequi => {
        console.log(newequi);
      this.router.navigate(['/auth/consequi']);
      }, error => console.log(<any>error));
  
  }
  saveEquipo() { 
    const saveEquipo = {
      nombre_equi: this.formaForm.get('nombre_equi').value
    }
    return saveEquipo;
    }
  }
  


