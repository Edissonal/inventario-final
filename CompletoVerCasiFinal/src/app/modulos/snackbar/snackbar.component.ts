import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  @Input() fondo: any; 
  @Input() nota: any; 
  @ViewChild('close',{static: false} ) close: ElementRef;

  constructor() { 
  }


  ngOnInit() {

  }
 
  llamado() {
    this.close.nativeElement.classList.add('elimina')
  }
}
