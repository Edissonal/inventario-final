import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InicioRegistroPage } from './inicio-registro.page';

describe('InicioRegistroPage', () => {
  let component: InicioRegistroPage;
  let fixture: ComponentFixture<InicioRegistroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioRegistroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
