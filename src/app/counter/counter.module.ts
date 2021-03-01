import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterRoutingModule } from './counter-routing.module';
import { CounterComponent } from './counter/counter.component';
import { FormsModule } from '@angular/forms';
import { CounterButtonComponent } from './counter-button/counter-button.component';
import { CounterOutputComponent } from './counter-output/counter-output.component';
import { CounterCustomInputComponent } from './counter-custom-input/counter-custom-input.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './state/counter.reducer';
import { COUNTER_STATE_NAME } from './state/counter.selectors';

@NgModule({
  declarations: [
    CounterComponent,
    CounterButtonComponent,
    CounterOutputComponent,
    CounterCustomInputComponent,
  ],
  imports: [
    CommonModule,
    CounterRoutingModule,
    FormsModule,
    StoreModule.forFeature(COUNTER_STATE_NAME, counterReducer)
  ]
})
export class CounterModule { }
