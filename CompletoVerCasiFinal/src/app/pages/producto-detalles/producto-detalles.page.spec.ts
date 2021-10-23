import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductoDetallesPage } from './producto-detalles.page';

describe('ProductoDetallesPage', () => {
  let component: ProductoDetallesPage;
  let fixture: ComponentFixture<ProductoDetallesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoDetallesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoDetallesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
