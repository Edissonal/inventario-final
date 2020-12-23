import { Component, Input, OnInit } from '@angular/core';   
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MarcaService } from '../../../servicios/marca.service';
import { EquiposService } from '../../../servicios/equipos.service';
import { UbicacionService } from '../../../servicios/ubicacion.service';
import { ConsultasService } from '../../../servicios/consultas.service';

@Component({
  selector: 'app-addc-final',
  templateUrl: './addc-final.component.html',
  styleUrls: ['./addc-final.component.css']
})
export class AddcFinalComponent implements OnInit {
  @Input() consulta: any;
  consultaForm: FormGroup;
  marcas: any[] = [];
  equipos: any[] = [];
  ubicaciones: any[] = [];
  showView: boolean = false;
  consultas: any;
  constructor(private fb: FormBuilder,
              private marcaService: MarcaService,
              private equiposService: EquiposService,
              private ubicacionService: UbicacionService,
              private consultasService:ConsultasService){
    if (this.consulta) {
      this.showView = true;
    }
    this.creaFormulario();
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


  ngOnInit() {
    this.conMa();
    this.conEqui();
    this.conUbi();

  
  }
  creaFormulario() {
    
    this.consultaForm = this.fb.group({
      id_con: [{value: '', disabled: true}, Validators.required],
      nombre_con: [{value: '', disabled: true}, Validators.required],
      id_ma: ['', Validators.required],
      id_equi: ['', Validators.required],
      id_ubi: ['', Validators.required],
      modelo_con: ['', [Validators.required,Validators.minLength(3)]],
      serial_con: ['', [Validators.required,Validators.minLength(3)]],
      placa_con: [{value: '', disabled: true}, Validators.required],
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


  onSubmit() {

    if (this.consultaForm.invalid) {
      Object.values(this.consultaForm.controls).forEach(control => { 
        control.markAllAsTouched();
      });
      return;
    }
    this.consultas = this.saveConsulta();
    this.consultasService.postConsulta(this.consultas)
      .subscribe(res => { 
        console.log(res);
      }, error => console.log(<any>error));
      this.consultaForm.reset();
  }


  saveConsulta() {
    const saveconsulta = {
      id_con:this.consultaForm.get('id_con').value, 
      nombre_con: this.consultaForm.get('nombre_con').value,
      id_ma: this.consultaForm.get('id_ma').value,
      id_equi:this.consultaForm.get('id_equi').value,
      id_ubi:this.consultaForm.get('id_ubi').value, 
      modelo_con:this.consultaForm.get('modelo_con').value, 
      serial_con: this.consultaForm.get('serial_con').value,
      placa_con:this.consultaForm.get('placa_con').value, 
    }
    return saveconsulta
  }
}
