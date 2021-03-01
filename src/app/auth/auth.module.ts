import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { AuthReducer } from './state/auth.reducer';
import { AUTH_STATE_NAME } from './state/auth.selector';
import { AuthEffects } from './state/auth.effects';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer)
  ]
})
export class AuthModule { }
