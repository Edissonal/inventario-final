import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { SedeService } from '../../../servicios/sede.service';
import { CiudadService } from '../../../servicios/ciudad.service';
import { ProvedoresService } from '../../../servicios/provedores.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Sedes } from '../../../interfaces/sedes.interfaces';
import { Ciudad } from '../../../interfaces/ciudad.interface';
import { Provedor } from '../../../interfaces/provedor.interface';
@Component({
  selector: 'app-addsede',
  templateUrl: './addsede.component.html',
  styleUrls: ['./addsede.component.css']
})
export class AddsedeComponent implements OnInit {
  @Input() sede: any;
  sedeForm: FormGroup;
  ciudades: Ciudad[] = [];
  provedores: Provedor[] = [];
  showView: boolean = false;
  sedes: Sedes;

  constructor(private fb: FormBuilder,
              private sedeService : SedeService,
              private ciudadService: CiudadService,
              private router: Router,
              private provedoresService: ProvedoresService) { 
                if (this.sede) {
                  this.showView = true;
                }
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
    this.ciudadService.getCiudad()
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
    if (this.sedeForm.invalid) {
      
      Object.values(this.sedeForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }
    this.sedes = this.saveSede();
    this.sedeService.postsede(this.sedes)
      .subscribe(newsede => { 
        console.log(newsede);
        this.router.navigate(['/auth/conssede']);
      }, error => console.log(<any>error));
      this.sedeForm.reset();
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
