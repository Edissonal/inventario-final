import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalpedidoproductosPage } from './modalpedidoproductos.page';

describe('ModalpedidoproductosPage', () => {
  let component: ModalpedidoproductosPage;
  let fixture: ComponentFixture<ModalpedidoproductosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalpedidoproductosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalpedidoproductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
