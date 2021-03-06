import { Component, Input, OnInit } from '@angular/core';
import { MantenimientosService } from '../../../servicios/mantenimientos.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MarcaService } from '../../../servicios/marca.service';
import { EquiposService } from '../../../servicios/equipos.service';
import { ProvedoresService } from '../../../servicios/provedores.service';
import { CiudadService } from '../../../servicios/ciudad.service';
import { SedeService } from '../../../servicios/sede.service';
import { UbicacionService } from '../../../servicios/ubicacion.service';

@Component({
  selector: 'app-addmante',
  templateUrl: './addmante.component.html',
  styleUrls: ['./addmante.component.css']
})
export class AddmanteComponent implements OnInit {

  @Input() mante: any[];

  datos: any;
  vista: boolean = false;
  forma: FormGroup;
  marcas: any[] = [];
  equipos: any[] = [];
  provedor: any[] = [];
  ciudad: any[] = [];
  sede: any[] = [];
  ubicacion: any[] = [];
  mantenimientos: any;

  constructor(private mantenimientosService: MantenimientosService,
    private fb: FormBuilder,
    private marcaService: MarcaService,
    private equiposService: EquiposService,
    private provedoresService: ProvedoresService,
    private ciudadService: CiudadService,
    private sedeService: SedeService,
    private ubicacionService: UbicacionService,
    ) {
    this.crearFormulario();
               }

  ngOnInit() {

    console.log("prueba", this.mante);
    this.conMarca();
    this.conEqui();
    this.conPro();
    this.ciuCon();
    this.Sedecon();
    this.conUbi();
    
  }
  get idconno() {
    return this.forma.get('id_con').invalid && this.forma.get('id_con').touched;
  }
  get marcano() {
    return this.forma.get('id_ma').invalid && this.forma.get('id_ma').touched;
  }
  get equino() {
    return this.forma.get('id_equi').invalid && this.forma.get('id_equi').touched;
  }
  get prono() {
    return this.forma.get('id_pro').invalid && this.forma.get('id_pro').touched;
  }
  get ciuno() {
    return this.forma.get('id_ciu').invalid && this.forma.get('id_ciu').touched;
  }
  get sedeno() {
    return this.forma.get('id_sede').invalid && this.forma.get('id_sede').touched;
  }
  get ubino() {
    return this.forma.get('id_ubi').invalid && this.forma.get('id_ubi').touched;
  }
  get fechamanno() {
    return this.forma.get('fecha_man').invalid && this.forma.get('fecha_man').touched;
  }

  get perino() {
    return this.forma.get('peri_man').invalid && this.forma.get('peri_man').touched;
  }
  get estano() {
    return this.forma.get('esta_man').invalid && this.forma.get('esta_man').touched;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      id_con: [{value:'',disabled:true}, Validators.required],
      id_ma: [{value:'',disabled:true}, Validators.required],
      id_equi: [{value:'',disabled:true}, Validators.required],
      id_pro: [{value:'',disabled:true}, Validators.required],
      id_ciu: [{value:'',disabled:true}, Validators.required],
      id_sede: [{value:'',disabled:true}, Validators.required],
      id_ubi:[{value:'',disabled:true}, Validators.required],
      fecha_man: ['', [Validators.required]],
      peri_man: ['', [Validators.required]],
      esta_man: ['', [Validators.required]],
      fecha_pro_man: [''],
    });
  }



  conMarca() {
    this.marcaService.getmarca()
      .subscribe(res => {
        this.marcas = res['data'];
      }, error => {
          console.log(error); 
      });
  }

  conEqui() {
    this.equiposService.getequipos()
      .subscribe(res => {
        this.equipos = res['data'];
      }, error => {
          console.log(error);
      });
   }
  
  conPro() {
    this.provedoresService.getprovedor()
      .subscribe(res => {
        this.provedor = res['data'];
      }, error => {
          console.log(error);
    })
  }

  ciuCon() { 
    this.ciudadService.getCiudad()
      .subscribe(res => {
        this.ciudad = res['data'];
      }, error => {
          console.log(error);
    })
  }
  

  Sedecon() {
    this.sedeService.getsede()
      .subscribe(res => {
        this.sede = res['data'];
      }, error => {
          console.log(error);
    })
  }

  conUbi() {
    this.ubicacionService.getubicacion()
      .subscribe(res => {
        this.ubicacion = res['data'];
      }, error => {
          console.log(error);
      })

  }

  postmante(termino: string) {
    
    console.log("select", termino);
    this.mantenimientosService.getserial(termino)
      .subscribe(res => {
      
        this.datos = res['data'];
        this.vista = true;
        console.log(this.datos);
      }, error => {
          console.log(error);
      });
   
    
  }
  

  onSubmit() {
     
    if (this.forma.invalid) {
      Object.values(this.forma.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }

    this.mantenimientos = this.saveMan();
    this.mantenimientosService.postMante(this.mantenimientos)
      .subscribe(res => {
        console.log(res);
      }, error => {
        console.log(error);
      });
    this.forma.reset();
  }





  saveMan() {
    const saveMante = {
    
      id_con: this.forma.get('id_con').value,
      id_ma: this.forma.get('id_ma').value,
      id_equi: this.forma.get('id_equi').value,
      id_pro: this.forma.get('id_pro').value,
      id_ciu: this.forma.get('id_ciu').value,
      id_sede: this.forma.get('id_sede').value,
      id_ubi: this.forma.get('id_ubi').value,
      fecha_man: this.forma.get('fecha_man').value,
      peri_man: this.forma.get('peri_man').value,
      esta_man: this.forma.get('esta_man').value,
      fecha_pro_man: this.forma.get('fecha_pro_man').value,

  }

    return saveMante;
}

   
}
