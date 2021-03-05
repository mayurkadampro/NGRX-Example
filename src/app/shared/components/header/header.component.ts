import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { autoLogout } from 'src/app/auth/state/auth.actions';
import { getUser } from 'src/app/auth/state/auth.selector';
import { AuthState } from 'src/app/auth/state/auth.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isAuthenticated: Observable<boolean>;
  constructor(private store: Store<AuthState>) { }

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(getUser);
  }

  onLogout(){
    this.store.dispatch(autoLogout());
  }
}
