import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsedeComponent } from './addsede.component';

describe('AddsedeComponent', () => {
  let component: AddsedeComponent;
  let fixture: ComponentFixture<AddsedeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsedeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
