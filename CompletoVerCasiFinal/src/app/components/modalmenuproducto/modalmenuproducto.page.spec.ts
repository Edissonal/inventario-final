import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalmenuproductoPage } from './modalmenuproducto.page';

describe('ModalmenuproductoPage', () => {
  let component: ModalmenuproductoPage;
  let fixture: ComponentFixture<ModalmenuproductoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalmenuproductoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalmenuproductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
