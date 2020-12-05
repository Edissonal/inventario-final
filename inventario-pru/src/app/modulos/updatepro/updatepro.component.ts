import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { subscribeOn } from 'rxjs/operators';
import { ProvedoresService } from '../../servicios/provedores.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updatepro',
  templateUrl: './updatepro.component.html',
  styleUrls: ['./updatepro.component.css']
})
export class UpdateproComponent implements OnInit {
  
  proveedorForm: FormGroup;
  proveedor: any;
  id_pro: any;
  showView:boolean = false;
  constructor(private pf: FormBuilder,
              private provedoresService: ProvedoresService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
      
         this.activatedRoute.params
           .subscribe(parametros => {
             this.id_pro = parametros['id'];
           this.provedoresService.getprovedorr(this.id_pro)
             .subscribe(proveedor => {
               this.proveedor = proveedor['data']
               this.showView = true;
               
              })
       })
    
               }

              ngOnInit() {
                this.proveedorForm = this.pf.group({
                  nombre_pro: ['', Validators.required],
                  direccion_pro: ['', Validators.required],
                  nit_pro: ['', Validators.required],
                });
              }
  
              onSubmit() {
                this.proveedor = this.saveProvedor();
                this.provedoresService.putprovedor(this.proveedor, this.id_pro)
                  .subscribe(newpro => {
                    console.log(newpro);
                    this.router.navigate(['consulta']);
                  },
                  err=> console.log(err));
              }
              saveProvedor() {
                const saveProvedor = {
                  nombre_pro: this.proveedorForm.get('nombre_pro').value,
                  direccion_pro: this.proveedorForm.get('direccion_pro').value,
                  nit_pro: this.proveedorForm.get('nit_pro').value,
                }
                return saveProvedor;
              }
            }
  
