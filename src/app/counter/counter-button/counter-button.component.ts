import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Decrement, Increment, Reset } from '../state/counter.actions';
import { initialStateInterface } from '../state/counter.state';

@Component({
  selector: 'app-counter-button',
  templateUrl: './counter-button.component.html',
  styleUrls: ['./counter-button.component.css']
})
export class CounterButtonComponent implements OnInit {

  
  constructor(private store: Store<initialStateInterface>) { }


  ngOnInit(): void {
  }

  onIncrement() {
    this.store.dispatch(Increment());
  }

  onDecrement() {
    this.store.dispatch(Decrement());
  }

  onReset() {
    this.store.dispatch(Reset());
  }

}
