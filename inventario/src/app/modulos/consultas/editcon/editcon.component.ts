import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MarcaService } from '../../../servicios/marca.service';
import { EquiposService } from '../../../servicios/equipos.service';
import { UbicacionService } from '../../../servicios/ubicacion.service';
import { ConsultasService } from '../../../servicios/consultas.service';
import { ProvedoresService } from '../../../servicios/provedores.service';

@Component({
  selector: 'app-editcon',
  templateUrl: './editcon.component.html',
  styleUrls: ['./editcon.component.css']
})
export class EditconComponent implements OnInit {
  consultas: any;
  id_con: any;
  consultaForm: FormGroup;
  marcas: any[] = [];
  equipos: any[] = [];
  ubicaciones: any[] = [];
  provedores: any[] = [];
  showView: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private marcaService: MarcaService,
              private equiposService: EquiposService,
              private ubicacionService: UbicacionService,
              private consultasService: ConsultasService,
              private   provedoresService:ProvedoresService) {
    this.activatedRoute.params
      .subscribe(resp => {
        this.id_con = resp['id'];
        this.consultasService.getConsulta(this.id_con)
          .subscribe(res => {
            
            this.consultas = res['data'];
            console.log(this.consultas);
            this.showView = true;

          });
      })
      this.creaFormulario();
  }


  get idPronovalido() {
    return this.consultaForm.get('id_pro').invalid && this.consultaForm.get('id_pro').touched;
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

  creaFormulario() {
    
    this.consultaForm = this.fb.group({
      id_pro: [{value: '', disabled: true}, Validators.required],
      id_ma: ['', Validators.required],
      id_equi: ['', Validators.required],
      id_ubi: ['', Validators.required],
      modelo_con: ['', [Validators.required,Validators.minLength(3)]],
      serial_con: ['', [Validators.required,Validators.minLength(3)]],
      placa_con: [{value: '', disabled: true}, Validators.required],
    });
  }

  ngOnInit() {
     this.conMa();
    this.conEqui();
    this.conUbi();
    this.conpro();
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

  conpro() {
    this.provedoresService.getprovedor()
      .subscribe(res => {
        this.provedores = res['data'];
        this.showView = true;
       }, error => {
        console.log(<any>error);
         
     });
  }

  onSubmit() { 
    this.consultas = this.saveConsulta();
    this.consultasService.putconsulta(this.consultas, this.id_con)
      .subscribe(res => { 
        console.log(res);
        this.showView = true;
        this.router.navigate(['consulta']);
      }, error => {
          console.log(<any>error);
      });
  }

  saveConsulta() {
    
    const saveconsulta = {
      id_pro: this.consultaForm.get('id_pro').value,
      id_ma: this.consultaForm.get('id_ma').value,
      id_equi:this.consultaForm.get('id_equi').value,
      id_ubi:this.consultaForm.get('id_ubi').value, 
      modelo_con:this.consultaForm.get('modelo_con').value, 
      serial_con: this.consultaForm.get('serial_con').value,
      placa_con:this.consultaForm.get('placa_con').value, 
    }
    return saveconsulta;
  }
  

}