import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { map } from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';
import { AlertController } from '@ionic/angular';

export interface Message {
  createdAt: firebase.default.firestore.FieldValue;
  fromUser: string;
  toUser: string;
  msg: string;
  delivered: boolean;
  view: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messagesObs: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private notifyMessagesObs: BehaviorSubject<any[]> = new BehaviorSubject([]);
  private messages = [];

  constructor(
    private afs: AngularFirestore,
    public alertCtrl: AlertController
  ) { }

  public setMessages(messages) {    
    this.messages = messages;
    this.messagesObs.next(this.messages);
  }

  public setNotifyMessages(messages) { 
    this.notifyMessagesObs.next(this.messages);
  }

  public get getnotifyMessagesObs() {
    return this.notifyMessagesObs.asObservable();
  }

  public get getMessagesObs() {
    return this.messagesObs.asObservable();
  }

  addChatMessage(msg: string , toUser, fromUser, idChat: string, nameUser: string){
    let docRef = this.afs.collection('chats').doc("rooms").collection(idChat);
    return docRef.add({
      msg,
      nameUser,
      toUser: Number(toUser),
      fromUser: Number(fromUser),
      delivered: true,
      view: false,
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
    });
  }

  updateMessages(path: string) {
    return this.afs.doc(path);
  }

  listenChatMessages(idChat: string) {
    let docRef = this.afs.collection('chats').doc("rooms").collection(idChat, ref => ref.orderBy('createdAt'));
    
    return docRef.stateChanges().pipe(
      map((messages => {
        let newMessages = messages.reduce( (filtered, all, i) => {
          if (all.type == 'added') {
            filtered.push({ 
              id: all.payload.doc.id, 
              ref_path: all.payload.doc.ref.path,
              ...all.payload.doc.data()
            });
          } else if (all.type == 'modified') {
            const exists = this.messages.findIndex((alSaved) => alSaved.id == all.payload.doc.id);
            this.messages[exists] = { 
              id: all.payload.doc.id, 
              ref_path: all.payload.doc.ref.path, 
              ...all.payload.doc.data()
            }
          }
          return filtered;
        }, []);
        this.setMessages(this.messages.concat(newMessages));
        return newMessages;
      }))
    );
  }

  notifyChatMessages(idChat: string) {
    let docRef = this.afs.collection('chats').doc("rooms").collection(idChat, ref => ref.orderBy('createdAt'));
    
    return docRef.stateChanges().pipe(
      map((messages => {
        let newMessages = messages.reduce( (filtered, all, i) => {
          if (all.type == 'added') {
            filtered.push({ 
              id: all.payload.doc.id, 
              ref_path: all.payload.doc.ref.path,
              ...all.payload.doc.data()
            });
          } else if (all.type == 'modified') {
            const exists = this.messages.findIndex((alSaved) => alSaved.id == all.payload.doc.id);
            this.messages[exists] = { 
              id: all.payload.doc.id, 
              ref_path: all.payload.doc.ref.path, 
              ...all.payload.doc.data()
            }
          }
          return filtered;
        }, []);
        this.setNotifyMessages(this.messages.concat(newMessages));
        return newMessages;
      }))
    );
  }

}