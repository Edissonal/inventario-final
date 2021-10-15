import { Component, Input, OnInit } from '@angular/core';   
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MarcaService } from '../../../servicios/marca.service';
import { EquiposService } from '../../../servicios/equipos.service';
import { UbicacionService } from '../../../servicios/ubicacion.service';
import { ConsultasService } from '../../../servicios/consultas.service';
import { CiudadService } from '../../../servicios/ciudad.service';
import { SedeService } from '../../../servicios/sede.service';
import { Marcas } from '../../../interfaces/marcas.interfaces';
import { Equipos } from '../../../interfaces/equipos.interface';
import { Ciudad } from '../../../interfaces/ciudad.interface';
import { Sedes } from '../../../interfaces/sedes.interfaces';
import { Consultas } from '../../../interfaces/consultas.interface';
import { Ubicacion } from '../../../interfaces/ubicacion.interface';

@Component({
  selector: 'app-addc-final',
  templateUrl: './addc-final.component.html',
  styleUrls: ['./addc-final.component.css']
})
export class AddcFinalComponent implements OnInit {
  @Input() consulta: any;
  consultaForm: FormGroup;
  marcas: Marcas[] = [];
  equipos: Equipos[] = [];
  ubicaciones: Ubicacion[] = [];
  ciudades: Ciudad[] = [];
  sedes: Sedes[] = [];
  showView: boolean = false;
  consultas: Consultas;
  validacion: number;
  mensaje: string;
  constructor(private fb: FormBuilder,
              private marcaService: MarcaService,
              private equiposService: EquiposService,
              private ubicacionService: UbicacionService,
              private consultasService: ConsultasService,
              private ciudadService: CiudadService,
              private sedeService:SedeService) {
    
    if (this.consulta) {
      this.showView = true;
    }
    this.creaFormulario();
  }

  tiempo() {
    setTimeout(() => {
      this.validacion = null;
    }, 5000);
  }


  get idNovalido() {
    return this.consultaForm.get('id_con').invalid && this.consultaForm.get('id_con').touched;
  }

  get nombreNovalido() {
    return this.consultaForm.get('nombre_con').invalid && this.consultaForm.get('nombre_con').touched;
  }
  get marcaNovalido() {
    return this.consultaForm.get('id_ma').invalid && this.consultaForm.get('id_ma').touched;
  }

  get equipoNovalido() {
    return this.consultaForm.get('id_equi').invalid && this.consultaForm.get('id_equi').touched;
  }

  get ubicacionNovalido() {
    return this.consultaForm.get('id_ubi').invalid && this.consultaForm.get('id_ubi').touched;
  }

  get modeloNovalido() {
    return this.consultaForm.get('modelo_con').invalid && this.consultaForm.get('modelo_con').touched;
  }

  get serialNovalido() {
    return this.consultaForm.get('serial_con').invalid && this.consultaForm.get('serial_con').touched;
  }

  get placaNovalido() {
    return this.consultaForm.get('placa_con').invalid && this.consultaForm.get('placa_con').touched;
  }

  get ciudadNovalido() {
    return this.consultaForm.get('id_ciu').invalid && this.consultaForm.get('id_ciu').touched;
  }

  get sedeNovalido() {
    return this.consultaForm.get('id_se').invalid && this.consultaForm.get('id_se').touched;
  }

  get tinno() {
    return this.consultaForm.get('ti_man').invalid && this.consultaForm.get('ti_man').touched;
  }


  ngOnInit() {
    this.conMa();
    this.conEqui();
    this.conUbi();
    this.conCiu();
    this.conSede();

  
  }
  creaFormulario() {
    
    this.consultaForm = this.fb.group({
      id_con: [{value: '', disabled: true}, Validators.required],
      nombre_con: [{value: '', disabled: true}, Validators.required],
      id_ma: ['', Validators.required],
      id_equi: ['', Validators.required],
      id_ubi: ['', Validators.required],
      id_ciu: ['', Validators.required],
      id_se: ['', Validators.required],
      modelo_con: ['', [Validators.required,Validators.minLength(3)]],
      serial_con: ['', [Validators.required,Validators.minLength(3)]],
      placa_con: [{value: '', disabled: true}, Validators.required],
      ti_man: ['', Validators.required],
    });
  }

  

  conMa() {
    this.marcaService.getmarca()
      .subscribe(res => {
        this.marcas = res['data'];
        this.showView = true;
       }, error => {
        console.log(<any>error);
         
     });
  }
  conEqui() {
    this.equiposService.getequipos()
      .subscribe(res => {
        this.equipos = res['data'];
        this.showView = true;
      }, error => {
        console.log(<any>error);
         
     });
  }
  
  conUbi() {
    this.ubicacionService.getubicacion()
      .subscribe(res => {
        this.ubicaciones = res['data'];
        this.showView = true;
       }, error => {
        console.log(<any>error);
         
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

  conSede() {
    this.sedeService.getsede()
      .subscribe(res => {
        this.sedes = res['data'];
        this.showView = true;
      }, error => {
          console.log(<any>error);
    })
  }

  onSubmit() {

    if (this.consultaForm.invalid) {
      Object.values(this.consultaForm.controls).forEach(control => { 
        control.markAllAsTouched();
      });
      return;
    }
    this.consultas = this.saveConsulta();
    this.consultasService.postConsulta(this.consultas)
      .subscribe( res => {
        
        if(res.code == 404){
          console.log(res);
          this.validacion = res.code;
          this.mensaje = res.message;
          this.tiempo();
        } else {
          console.log(res);
          this.validacion = res.code;
          this.mensaje = res.message;
          this.tiempo();
        }
      }, error => console.log(<any>error));
      this.consultaForm.reset();
  }


  saveConsulta() {
    const saveconsulta = {
      id_con:this.consultaForm.get('id_con').value, 
      nombre_con: this.consultaForm.get('nombre_con').value,
      id_ma: this.consultaForm.get('id_ma').value,
      id_equi:this.consultaForm.get('id_equi').value,
      id_ubi: this.consultaForm.get('id_ubi').value, 
      id_ciu: this.consultaForm.get('id_ciu').value,
      id_se: this.consultaForm.get('id_se').value,
      modelo_con:this.consultaForm.get('modelo_con').value, 
      serial_con: this.consultaForm.get('serial_con').value,
      placa_con: this.consultaForm.get('placa_con').value,
      ti_man:this.consultaForm.get('ti_man').value
    }
    return saveconsulta
  }
}
