import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-categoriaspro',
  templateUrl: './categoriaspro.page.html',
  styleUrls: ['./categoriaspro.page.scss'],
})
export class CategoriasproPage implements OnInit {


  @Input() categoriasart: any[];
  @Input() cdn_site: string;
  constructor() { }

  ngOnInit() {
  }


}
