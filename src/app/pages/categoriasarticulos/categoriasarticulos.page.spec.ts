import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoriasarticulosPage } from './categoriasarticulos.page';

describe('CategoriasarticulosPage', () => {
  let component: CategoriasarticulosPage;
  let fixture: ComponentFixture<CategoriasarticulosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriasarticulosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriasarticulosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
