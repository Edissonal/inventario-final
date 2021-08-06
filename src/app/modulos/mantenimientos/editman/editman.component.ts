import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MantenimientosService } from '../../../servicios/mantenimientos.service';
import { MarcaService } from '../../../servicios/marca.service';
import { EquiposService } from '../../../servicios/equipos.service';
import { ProvedoresService } from '../../../servicios/provedores.service';
import { CiudadService } from '../../../servicios/ciudad.service';
import { SedeService } from '../../../servicios/sede.service';
import { UbicacionService } from '../../../servicios/ubicacion.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs/operators';
import { NumberPipe } from '../../pipes/numeros.pipe';

@Component({
  selector: 'app-editman',
  templateUrl: './editman.component.html',
  styleUrls: ['./editman.component.css'],
  providers: [NumberPipe]
})
export class EditmanComponent implements OnInit {

  formaForm: FormGroup;
  mantenimiento: any;
  id_man: any;
  showview: boolean = false;
  marcas: any[] = [];
  equipos: any[] = [];
  proveedor: any[] = [];
  ciudad: any[] = [];
  sede: any[] = [];
  ubicacion: any[] = [];
  fechaini: any =0;
  date: Date;
  fecha_pro_man: any = 0;
  perio: any=0;
  fecha_man: NgbDateStruct;
  costo_man:  string ="0";
  
  constructor(private fb:FormBuilder,  
              private activateRoute: ActivatedRoute,
              private mantenimientosService: MantenimientosService,
              private marcaService: MarcaService,
              private equiposService: EquiposService,
              private provedoresService: ProvedoresService,
              private ciudadService: CiudadService,
              private sedeService: SedeService,
              private ubicacionService: UbicacionService,
              private router: Router,
              private changeRef:ChangeDetectorRef
              
              
              ) {
    this.activateRoute.params
      .subscribe(res => {
        this.id_man = res['id'];
        this.mantenimientosService.getMa(this.id_man)
          .subscribe(resp => {
            this.mantenimiento = resp['data'];
            let valor = this.mantenimiento['fecha_man'];
            this.costo_man= this.mantenimiento['costo_man'];
            let valorini = valor.split('-', 3).map(Number);
            this.fecha_man = { year: valorini[0], month: valorini[1], day: valorini[2] };
            console.log(this.mantenimiento);
            this.showview = true;
        })
      });
    this.crearFormulario();

  }
  

  ngOnInit() {
    this.conMarca();
    this.conEqui();
    this.conPro();
    this.conCiu();
    this.consede();
    this.conUbi();
    this.onChanges();
  }

  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }

  get idconno() {
    return this.formaForm.get('id_con').invalid && this.formaForm.get('id_con').touched;
  }
  get marcano() {
    return this.formaForm.get('id_ma').invalid && this.formaForm.get('id_ma').touched;
  }
  get equino() {
    return this.formaForm.get('id_equi').invalid && this.formaForm.get('id_equi').touched;
  }
  get prono() {
    return this.formaForm.get('id_pro').invalid && this.formaForm.get('id_pro').touched;
  }
  get ciuno() {
    return this.formaForm.get('id_ciu').invalid && this.formaForm.get('id_ciu').touched;
  }
  get sedeno() {
    return this.formaForm.get('id_sede').invalid && this.formaForm.get('id_sede').touched;
  }
  get ubino() {
    return this.formaForm.get('id_ubi').invalid && this.formaForm.get('id_ubi').touched;
  }
  get fechamanno() {
    return this.formaForm.get('fecha_man').invalid && this.formaForm.get('fecha_man').touched;
  }

  get perino() {
    return this.formaForm.get('periodicidad_man').invalid && this.formaForm.get('periodicidad_man').touched;
  }
  get estano() {
    return this.formaForm.get('estado_man').invalid && this.formaForm.get('estado_man').touched;
  }

  get constono() {
    return this.formaForm.get('costo_man').invalid && this.formaForm.get('costo_man').touched;
  }

  get proxino() {
    return this.formaForm.get('fecha_pro_man').invalid && this.formaForm.get('fecha_pro_man').touched;
  }


  conMarca() {
    this.marcaService.getmarca()
      .subscribe(res => {
        this.marcas = res['data'];
      }, error => {
        console.log(error);
    })
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
        this.proveedor = res['data'];
      }, error => {
        console.log(error);
      });
  }

  conCiu() {
    this.ciudadService.getCiudad()
      .subscribe(res => {
        this.ciudad = res['data'];
      }, error => {
        console.log(error);
      });
   }
  
  
  consede() {
    this.sedeService.getsede()
      .subscribe(res => {
        this.sede = res['data'];
      }, error => {
        console.log(error);
      });
    
  }
  
  conUbi() {
    this.ubicacionService.getubicacion()
      .subscribe(res => {
        this.ubicacion = res['data'];
      }, error => {
        console.log(error);
      });
  }
  
  crearFormulario() {
    this.formaForm = this.fb.group({

      id_con: ['', [Validators.required,]],
      id_ma: ['', [Validators.required,]],
      id_equi: ['', [Validators.required,]],
      id_pro: ['', [Validators.required,]],
      id_ciu: ['', [Validators.required,]],
      id_sede: ['', [Validators.required,]],
      id_ubi: ['', [Validators.required,]],
      fecha_man: ['', [Validators.required,]],
      periodicidad_man: ['', [Validators.required,]],
      estado_man: ['', [Validators.required,]],
      fecha_pro_man: [{value:this.fecha_pro_man,disabled:true }, [Validators.required]],
      costo_man:['', [Validators.required,Validators.pattern("^[0-9]+(?:,[0-9]+)*$")]],
      
    });
  
  }
 
  onSubmit() {
    
    if (this.formaForm.invalid) {
      Object.values(this.formaForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }


    this.mantenimiento = this.saveman();
    console.log(this.mantenimiento);
    this.mantenimientosService.putman(this.mantenimiento, this.id_man)
      .subscribe(res => {
      
        console.log(res);
        this.router.navigate(['/auth/cosman']);
      }, error => {
        console.log(error);
    })

  }



  onChanges() {
    this.formaForm.valueChanges.subscribe(valores => {
      

      let ano: any = 0;
      let mes: any = 0;
      let dia: any = 0;

      this.fechaini = valores.fecha_man;
      this.perio = valores.periodicidad_man;
      console.log(this.fechaini);
      console.log("Periodicidad",this.perio);

      
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
        this.formaForm.value.fecha_pro_man = `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`;
       
       } 
        
  
       if (this.perio == 6) {   
        this.date = new Date(ano, mes, dia);
        this.date.setMonth(this.date.getMonth() +6);
        this.formaForm.value.fecha_pro_man = `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`;
       
       } 
        

       if (this.perio == 12) {   
        this.date = new Date(ano, mes, dia);
        this.date.setMonth(this.date.getMonth() +12);
        this.formaForm.value.fecha_pro_man = `${this.date.getFullYear()}-${this.date.getMonth()}-${this.date.getDate()}`;
        
       } 
        
    
    }
     

   
  }

    });
  }


  
  saveman() {
    
    const valor = this.formaForm.get('fecha_man').value;
    let valorfi = `${valor.year}-${valor.month}-${valor.day}`;
    let costofi = parseFloat(this.costo_man.replace(/,/g, ''));
    const saveMante = {
    
      id_con: this.formaForm.get('id_con').value,
      id_ma: this.formaForm.get('id_ma').value,
      id_equi: this.formaForm.get('id_equi').value,
      id_pro: this.formaForm.get('id_pro').value,
      id_ciu: this.formaForm.get('id_ciu').value,
      id_sede: this.formaForm.get('id_sede').value,
      id_ubi: this.formaForm.get('id_ubi').value,
      fecha_man: valorfi,
      periodicidad_man: this.formaForm.get('periodicidad_man').value,
      estado_man: this.formaForm.get('estado_man').value,
      fecha_pro_man: this.formaForm.get('fecha_pro_man').value,
      costo_man: costofi

  }
    return saveMante;
  }


  
  }


