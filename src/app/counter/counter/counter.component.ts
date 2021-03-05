import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChangeChannelName } from '../state/counter.actions';
import { getChannelName } from '../state/counter.selectors';
import { initialStateInterface } from '../state/counter.state';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  channelName$: Observable<string>;
  constructor(private store : Store<initialStateInterface>) { }

  ngOnInit(): void {
    this.channelName$ = this.store.select(getChannelName);
  }

  changeChannelName(){
    this.store.dispatch(ChangeChannelName({
      value: "Hello World"
    }))
  }
}
