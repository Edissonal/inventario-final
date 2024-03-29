import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenunavbarComponent } from './menunavbar.component';

describe('MenunavbarComponent', () => {
  let component: MenunavbarComponent;
  let fixture: ComponentFixture<MenunavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenunavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenunavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
