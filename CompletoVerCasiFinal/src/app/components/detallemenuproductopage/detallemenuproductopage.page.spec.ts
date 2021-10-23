import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallemenuproductopagePage } from './detallemenuproductopage.page';

describe('DetallemenuproductopagePage', () => {
  let component: DetallemenuproductopagePage;
  let fixture: ComponentFixture<DetallemenuproductopagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallemenuproductopagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallemenuproductopagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
