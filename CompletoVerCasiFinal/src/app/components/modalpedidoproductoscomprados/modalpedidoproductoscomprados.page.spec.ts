import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalpedidoproductoscompradosPage } from './modalpedidoproductoscomprados.page';

describe('ModalpedidoproductoscompradosPage', () => {
  let component: ModalpedidoproductoscompradosPage;
  let fixture: ComponentFixture<ModalpedidoproductoscompradosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalpedidoproductoscompradosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalpedidoproductoscompradosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
