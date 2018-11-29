import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzaCustomComponent } from './pizza-custom.component';

describe('PizzaCustomComponent', () => {
  let component: PizzaCustomComponent;
  let fixture: ComponentFixture<PizzaCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PizzaCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
