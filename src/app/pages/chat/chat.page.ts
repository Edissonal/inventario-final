import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthguardService } from 'src/app/services/authguard.service';
import { ChatService } from 'src/app/services/chat.service';
import { ITendero, Messages } from './interfaces';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('toolbar', { read: ElementRef}) toolbar: ElementRef;
  @Input() tendero: string;
  @Input() cod_ventas: string;

  infoTendero: ITendero;
  newMsg: string;
  messages: Messages[] = [];
  currentId: number = 0;
  infoCliente: any;
  private suscription: Subscription;
  private chatSuscription: Subscription;

  constructor(
    public modalCtrl: ModalController,
    private _api: ApiService,
    private _auth: AuthguardService,
    private _chat: ChatService
  ) { }

  ionViewWillEnter() {
    
    window.addEventListener('keyboardDidHide', () => {
      this.toolbar.nativeElement.style.paddingBottom = 0 + 'px';
    });
    window.addEventListener('keyboardDidShow', async (event) => {
      let kbHeight: number = event["keyboardHeight"];
      this.toolbar.nativeElement.style.paddingBottom = (kbHeight + 47) + 'px';
    });
  }


  ngOnInit() {
    this.getInfoTendero();
    this._auth.getSession()
    .then( cliente => {
        // console.log(cliente);
      this.currentId = Number(cliente)    
      this._api.obtenerInfoCliente(cliente).subscribe(data => {
        // console.log(data);
        
        this.infoCliente = data[0];
      });
    });
    this.chatSuscription = this._chat.listenChatMessages(this.cod_ventas)
      .subscribe( res => console.log(res))

    this.suscription = this._chat.getMessagesObs.subscribe( messages => {
      // console.log('Mensajes: ', messages);
      this.messages = messages;
      this.updateMessages();
      if (this.content) {
        setTimeout(() => {
          this.content.scrollToBottom(500);
        }, 800);
      }
    });

    
  }

  ngOnDestroy(): void {
    this._chat.setMessages([]);
    this.suscription.unsubscribe();
    this.chatSuscription.unsubscribe();
  }

  getInfoTendero() {    
    this._api.obtenerInfoTendero(this.tendero)
      .subscribe((data: ITendero[]) => {
        
        this.infoTendero = data[0];
        // console.log(this.infoTendero);
      });
  }

  close() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  getMyInput(event) {

  }

  updateMessages() {
    let filtered = this.messages.filter( m => m.fromUser != this.currentId);
    setTimeout(() => {
      filtered.forEach( filter => {
        if (!filter.view) {
          filter.view = true;
          this._chat.updateMessages(filter.ref_path).update(filter);
        }
      })
    }, 2000);
  }

  sendMessage() {
    this._chat.addChatMessage(this.newMsg, this.infoTendero.codigo, this.currentId, this.cod_ventas, this.infoCliente.nombre)
    .then(() => {
        // console.log('mensaje agregado');
        if (this.tendero) {
          
          this._api.sendPushTendero(this.tendero,  `${ this.infoCliente.nombre } ${ this.infoCliente.apellido } te envió un mensaje.`).subscribe(res => {
            console.log(res)
          }, err => {
            console.log(err);            
          }
          )
        }
        this.newMsg = ''; 
        this.content.scrollToBottom();     
    });
  }

}
