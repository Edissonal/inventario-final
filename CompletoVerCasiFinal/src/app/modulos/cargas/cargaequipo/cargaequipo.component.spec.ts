import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaequipoComponent } from './cargaequipo.component';

describe('CargaequipoComponent', () => {
  let component: CargaequipoComponent;
  let fixture: ComponentFixture<CargaequipoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaequipoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaequipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
