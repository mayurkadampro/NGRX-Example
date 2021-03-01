import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { CustomIncrement } from '../state/counter.actions';

@Component({
  selector: 'app-counter-custom-input',
  templateUrl: './counter-custom-input.component.html',
  styleUrls: ['./counter-custom-input.component.css']
})
export class CounterCustomInputComponent implements OnInit {
  value: number;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  addNumber() {
    this.store.dispatch(CustomIncrement({
      value: this.value
    }))
  }
}
