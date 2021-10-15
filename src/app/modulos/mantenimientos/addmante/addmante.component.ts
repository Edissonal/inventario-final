import { ChangeDetectorRef } from '@angular/core';
import { Component, Input, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MantenimientosService } from '../../../servicios/mantenimientos.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MarcaService } from '../../../servicios/marca.service';
import { EquiposService } from '../../../servicios/equipos.service';
import { ProvedoresService } from '../../../servicios/provedores.service';
import { CiudadService } from '../../../servicios/ciudad.service';
import { SedeService } from '../../../servicios/sede.service';
import { UbicacionService } from '../../../servicios/ubicacion.service';
import { group } from '@angular/animations';
import { map, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NumberPipe } from '../../pipes/numeros.pipe';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Marcas } from '../../../interfaces/marcas.interfaces';
import { Equipos } from '../../../interfaces/equipos.interface';
import { Provedor } from '../../../interfaces/provedor.interface';
import { Ciudad } from 'src/app/interfaces/ciudad.interface';
import { Ubicacion } from '../../../interfaces/ubicacion.interface';
import { Mantenimientos } from '../../../interfaces/mantenimiento.interface ';
import { HistoMantenimientos } from 'src/app/interfaces/histomantenimiento.interface ';





@Component({
  selector: 'app-addmante',
  templateUrl: './addmante.component.html',
  styleUrls: ['./addmante.component.css'],
  providers: [NumberPipe]
})
export class AddmanteComponent implements OnInit {

  @Input() mante: any[];
  @Output() onMantenimiento: EventEmitter<boolean> = new EventEmitter();
  @Output() onvalida: EventEmitter<boolean> = new EventEmitter();

  datos: any;
  vista: boolean = false;
  respuesta: boolean = false;
  forma: FormGroup;
  formi: FormGroup;
  marcas: Marcas[] = [];
  equipos: Equipos[] = [];
  provedor: Provedor[] = [];
  ciudad: Ciudad[] = [];
  sede: SedeService[] = [];
  ubicacion: Ubicacion[] = [];
  mantenimientos: Mantenimientos;
  histman: HistoMantenimientos;
  valu: any[] = [];
  fechaini: any =0;
  date: Date;
  fecha_pro_man: string;
  perio: number = 0;
  validacion: number;
  mensaje: string;
  costo_man: string = "0";
  lista: boolean = false;
  result: any[] = [];
  valorfi: string;


  constructor(private mantenimientosService: MantenimientosService,
    private fb: FormBuilder,
    private marcaService: MarcaService,
    private equiposService: EquiposService,
    private provedoresService: ProvedoresService,
    private ciudadService: CiudadService,
    private sedeService: SedeService,
    private ubicacionService: UbicacionService,
    private cdref: ChangeDetectorRef,
    private router: Router,
    private changeRef: ChangeDetectorRef,
    private usuariosService:UsuariosService
    ) {
    this.crearFormulario();
    this.PriFormulario();
               }

  ngOnInit() {

    console.log("prueba", this.mante);
    this.conMarca();
    this.conEqui();
    this.conPro();
    this.ciuCon();
    this.Sedecon();
    this.conUbi();
    this.onChanges();

  
  }
  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }

  tiempo() {
    setTimeout(() => {
      this.validacion = null;
    }, 5000);
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

  get serino() {
    return this.formi.get('seri').invalid && this.formi.get('seri').touched;
  }

  get constono() {
    return this.forma.get('costo_man').invalid && this.forma.get('costo_man').touched;
  }

  get proxino() {
    return this.forma.get('fecha_pro_man').invalid && this.forma.get('fecha_pro_man').touched;
  }

  PriFormulario() {
    this.formi = this.fb.group({
      seri: ['', [Validators.required]],
    });
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
      fecha_pro_man: [{value:this.fecha_pro_man,disabled:true }, [Validators.required]],
      costo_man: ['', [Validators.required,Validators.pattern("^[0-9]+(?:,[0-9]+)*$")]],
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
    
   this.mante;

    console.log("termino", termino);
    //console.log(resultado);

  
     this.result= this.mante.filter(function(obj:any, index){
      return obj.serial_con.toLowerCase().includes(termino.toLowerCase());

    })
    
 
    if (this.result.length > 0) {
      this.lista = true;
      console.log(this.result);
       
     }

    }
  
  buscar(termino:string) {
    console.log(termino);
    
    console.log("select", termino);
    this.mantenimientosService.getserial(termino)
      .subscribe(res => {
      
        this.datos = res['data'];
        this.vista = true;
        this.lista = false;
        this.formi.value.seri = termino;
        
        console.log(this.datos);
      }, error => {
          console.log(error);
      });
    
  }


 
  
 

    onChanges() {
    this.forma.valueChanges.subscribe(valores => {
      

      let ano: any = 0;
      let mes: any = 0;
      let dia: any = 0;

      this.fechaini = valores.fecha_man;
      this.perio = valores.peri_man;
      console.log(this.fechaini);
      
      if (this.fechaini == null ) {
        console.log('años nulos')
        return;
      }else{
       
        ano = `${this.fechaini.year}`;
        mes = `${this.fechaini.month}`;
        dia = `${this.fechaini.day}`;
  

     if(ano === undefined && mes === undefined && dia   === undefined){
       console.log("variable no está definido");
       return;
    } else {
    
       
       if (this.perio == 3) {   
        this.date = new Date(ano, mes, dia);
        this.date.setMonth(this.date.getMonth() +3);
        this.forma.value.fecha_pro_man = `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`;
       
       } 
        
  
       if (this.perio == 6) {   
        this.date = new Date(ano, mes, dia);
        this.date.setMonth(this.date.getMonth() +6);
        this.forma.value.fecha_pro_man = `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`;
       
       } 
        

       if (this.perio == 12) {   
        this.date = new Date(ano, mes, dia);
        this.date.setMonth(this.date.getMonth() +12);
        this.forma.value.fecha_pro_man = `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`;
        
       } 
        
    
    }
     

   
  }
     
    

    });
  }

  saveMan() {
    const valor = this.forma.get('fecha_man').value;
     this.valorfi = `${valor.year}-${valor.month}-${valor.day}`;
    let costofi = parseFloat(this.costo_man.replace(/,/g, ''));
    
    const saveMante = {
    
      id_con: this.forma.get('id_con').value,
      id_ma: this.forma.get('id_ma').value,
      id_equi: this.forma.get('id_equi').value,
      id_pro: this.forma.get('id_pro').value,
      id_ciu: this.forma.get('id_ciu').value,
      id_sede: this.forma.get('id_sede').value,
      id_ubi: this.forma.get('id_ubi').value,
      fecha_man: this.valorfi,
      peri_man: this.forma.get('peri_man').value,
      esta_man: this.forma.get('esta_man').value,
      fecha_pro_man: this.forma.get('fecha_pro_man').value,
      costo_man: costofi

  }

    return saveMante;
}


saveManH() {
  const valor = this.forma.get('fecha_man').value;
  let costofi = parseFloat(this.costo_man.replace(/,/g, ''));
  let fec = new Date();
  let fachamo = `${fec.getFullYear()}-${fec.getMonth() + 1}-${fec.getDate()}`;
  let estado_hman = 'insert';
  let idusu = this.usuariosService.data.data.id_usu;
  
  
  const saveManH = {
  
    id_con: this.forma.get('id_con').value,
    id_ma: this.forma.get('id_ma').value,
    id_equi: this.forma.get('id_equi').value,
    id_pro: this.forma.get('id_pro').value,
    id_ciu: this.forma.get('id_ciu').value,
    id_sede: this.forma.get('id_sede').value,
    id_ubi: this.forma.get('id_ubi').value,
    fecha_man: this.valorfi,
    peri_man: this.forma.get('peri_man').value,
    esta_man: this.forma.get('esta_man').value,
    fecha_pro_man: this.forma.get('fecha_pro_man').value,
    costo_man: costofi,
    estado_hman:estado_hman,
    fecha_hman: fachamo,
    id_usu:idusu

}

  return saveManH;
}



onSubmit() {
     
  if (this.forma.invalid || this.formi.invalid) {
    Object.values(this.forma.controls).forEach(control => {
      control.markAllAsTouched();
      this.respuesta = true;
      this.onvalida.emit(this.respuesta);
    });

    Object.values(this.formi.controls).forEach(cntrl => {
      cntrl.markAllAsTouched();
    });
    return;
  }



  this.mantenimientos = this.saveMan();
  this.histman = this.saveManH();
//  console.log(this.mantenimientos);
  this.mantenimientosService.postMante(this.mantenimientos)
    .subscribe((res:any) => {
    
      if (res.code == 404) {
        console.log("respuesta"+res);
        this.vista = true;
        this.validacion = res.code;
        this.mensaje = res.message;
        this.tiempo();
      } else {
        this.validacion = res.code;
        this.mensaje = res.message;
        this.tiempo();
      }
    }, error => {
      console.log(error);
    });
  this.forma.reset();
  this.formi.reset();

  this.respuesta = true;
  this.onMantenimiento.emit(this.respuesta);
  //this.router.navigate(['/auth/cosman']);



}
  
  postDatos() {
    this.mantenimientosService.posManteH(this.histman)
    .subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
    
    
  }
  
}
