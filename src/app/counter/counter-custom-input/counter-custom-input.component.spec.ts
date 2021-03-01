import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterCustomInputComponent } from './counter-custom-input.component';

describe('CounterCustomInputComponent', () => {
  let component: CounterCustomInputComponent;
  let fixture: ComponentFixture<CounterCustomInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterCustomInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterCustomInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
