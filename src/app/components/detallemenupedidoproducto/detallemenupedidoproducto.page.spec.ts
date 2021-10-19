import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallemenupedidoproductoPage } from './detallemenupedidoproducto.page';

describe('DetallemenupedidoproductoPage', () => {
  let component: DetallemenupedidoproductoPage;
  let fixture: ComponentFixture<DetallemenupedidoproductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallemenupedidoproductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallemenupedidoproductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
