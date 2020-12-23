import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { MarcaService } from '../../../servicios/marca.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editmarca',
  templateUrl: './editmarca.component.html',
  styleUrls: ['./editmarca.component.css']
})
export class EditmarcaComponent implements OnInit {

  formaForm: FormGroup;
  marca: any;
  id_ma: any;
  showView:boolean = false;
  constructor(private fb: FormBuilder,
              private marcaService: MarcaService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { 
              this.crearFormulario(); 
               
    this.activatedRoute.params
      .subscribe(parametros => {
        this.id_ma = parametros['id'];
        this.marcaService.getMarcaa(this.id_ma)
          .subscribe(res => {
            this.marca = res['data']
            this.showView = true;
          });
      });
    
    
  }

  get nombreNovalido() {
    return this.formaForm.get('nombre_ma').invalid && this.formaForm.get('nombre_ma').touched;
  }

  ngOnInit() {
  }

  crearFormulario() { 

    this.formaForm = this.fb.group({
      nombre_ma: ['', [Validators.required,Validators.minLength(2)]],
     });
  }

  onSubmit() {
    if (this.formaForm.invalid) {
      
      Object.values(this.formaForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }
    this.marca = this.saveMarca();
    this.marcaService.putmarca(this.marca,this.id_ma)
      .subscribe(newpro => { 
        console.log(newpro);
         this.router.navigate(['consultarma']);
      }, error => console.log(<any>error));
     
  }

  saveMarca() {
    const saveMarca = {
      nombre_ma: this.formaForm.get('nombre_ma').value,
    }
    return saveMarca;
  }

}
