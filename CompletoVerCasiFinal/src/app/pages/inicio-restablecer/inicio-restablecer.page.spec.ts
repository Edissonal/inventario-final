import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InicioRestablecerPage } from './inicio-restablecer.page';

describe('InicioRestablecerPage', () => {
  let component: InicioRestablecerPage;
  let fixture: ComponentFixture<InicioRestablecerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioRestablecerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioRestablecerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
