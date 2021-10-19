import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalcomentariospedidoPage } from './modalcomentariospedido.page';

describe('ModalcomentariospedidoPage', () => {
  let component: ModalcomentariospedidoPage;
  let fixture: ComponentFixture<ModalcomentariospedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcomentariospedidoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalcomentariospedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
