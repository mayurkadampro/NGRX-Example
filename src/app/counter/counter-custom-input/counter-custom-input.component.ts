import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CustomIncrement } from '../state/counter.actions';
import { initialStateInterface } from '../state/counter.state';

@Component({
  selector: 'app-counter-custom-input',
  templateUrl: './counter-custom-input.component.html',
  styleUrls: ['./counter-custom-input.component.css']
})
export class CounterCustomInputComponent implements OnInit {
  value: number;
  constructor(private store: Store<initialStateInterface>) { }

  ngOnInit(): void {
  }

  addNumber() {
    this.store.dispatch(CustomIncrement({
      value: this.value
    }))
  }
}
