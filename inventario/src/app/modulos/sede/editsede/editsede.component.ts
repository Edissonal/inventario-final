import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { SedeService } from '../../../servicios/sede.service';
import { CiudadService } from '../../../servicios/ciudad.service';
import { ProvedoresService } from '../../../servicios/provedores.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editsede',
  templateUrl: './editsede.component.html',
  styleUrls: ['./editsede.component.css']
})
export class EditsedeComponent implements OnInit {

  sedeForm: FormGroup;
  ciudades: any[] = [];
  provedores: any[] = [];
  sede: any;
  id_sede: any;
  showView:boolean = false;
  constructor(private fb: FormBuilder,
              private sedeService : SedeService,
              private ciudadService: CiudadService,
              private provedoresService: ProvedoresService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { 
              
               
    this.activatedRoute.params
      .subscribe(parametros => {
        this.id_sede = parametros['id'];
        this.sedeService.getSedes(this.id_sede)
          .subscribe(res => {
            this.sede = res['data']
            this.showView = true;
          });
      });
      this.crearFormulario(); 
    
    
  }

  
  get ciudadNovalido() {
    return this.sedeForm.get('id_ciu').invalid && this.sedeForm.get('id_ciu').touched;
  }
  get provedorNovalido() {
    return this.sedeForm.get('id_pro').invalid && this.sedeForm.get('id_pro').touched;
  }
  get nombreNovalido() {
    return this.sedeForm.get('nombre_sede').invalid && this.sedeForm.get('nombre_sede').touched;
  }
  get direccionNovalido() {
    return this.sedeForm.get('direccion_sede').invalid && this.sedeForm.get('direccion_sede').touched;
  }

  ngOnInit() {
    this.conCiu();
    this.conPro();
  }

  crearFormulario() { 

    this.sedeForm = this.fb.group({      
      id_ciu: ['', [Validators.required]],
      id_pro: ['', [Validators.required]],
      nombre_sede: ['', [Validators.required,Validators.minLength(5)]],
      direccion_sede: ['', [Validators.required,Validators.minLength(10)]],    
     });
  }

  conCiu() {
    this.ciudadService.getciudad()
      .subscribe(res => {
        this.ciudades = res['data'];
        this.showView = true;
        console.log(this.ciudades);
      }, error => {
          console.log(<any>error);
    })
  }

  conPro() {
    this.provedoresService.getprovedor()
      .subscribe(res => {
        this.provedores = res['data'];
        this.showView = true;
      }, error => {
          console.log(<any>error);
    })
  }

  onSubmit() {

    this.sede = this.saveSede();
    this.sedeService.putsede(this.sede,this.id_sede)
      .subscribe(newsede => { 
        console.log(newsede);
        this.showView = true;
         this.router.navigate(['conssede']);
      }, error => console.log(<any>error));
     
  }

  saveSede() {
    const saveSede = {
      id_ciu: this.sedeForm.get('id_ciu').value,
      id_pro: this.sedeForm.get('id_pro').value,
      nombre_sede: this.sedeForm.get('nombre_sede').value,
      direccion_sede: this.sedeForm.get('direccion_sede').value,
    }
    return saveSede;
  }

}
