import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.page.html',
  styleUrls: ['./terminos.page.scss'],
})
export class TerminosPage implements OnInit {
  @Input() id;
  aceptarContrato: number;
  contrato: any = [];
  @Input() color;

  constructor(private modalController: ModalController, private api: ApiService) {
  }

  ngOnInit() {
  }

  cerrarModal() {
    this.modalController.dismiss(this.aceptarContrato = 1);
  }

}
