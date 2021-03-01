import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { getCounter } from '../state/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit {

  counter: number;
  counter$: Observable<number>
  // counterSubscription : Subscription
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.counterSubscription = this.store.select('counter').subscribe((data) => {
    //   this.counter = data.counter;
    // })

    this.counter$ = this.store.select(getCounter);
  }

  // ngOnDestroy(): void {
  //   if(this.counterSubscription){
  //     this.counterSubscription.unsubscribe();
  //   }
  // }

}
