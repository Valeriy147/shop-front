import { ChangeDetectionStrategy, Component, OnInit, Provider, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthFeature } from './store/auth.reducer';
import { IUserCreation } from './store/interfaces';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { login, register } from './store/auth.actions';
import { AuthService } from './services/auth.service';

import { AuthGuard } from './guards/auth.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { TextInputComponent } from 'src/app/shared/text-input/text-input.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@Component({
  standalone: true,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [
    CommonModule,
    SharedModule,
    TextInputComponent
  ],
  providers: [
    AuthGuard,
    INTERCEPTOR_PROVIDER,
    AuthService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  private _store = inject(Store);

  public registered: boolean = true;
  public formGroup!: FormGroup;
  public submitted: boolean = false;

  public isLoading$: Observable<boolean> = this._store.select(AuthFeature.selectLoading);
  public loginAgain$: Observable<boolean> = this._store.select(AuthFeature.selectLoginAgain);

  public ngOnInit(): void {
    this.formInit();
  }

  private _signIn(user: IUserCreation): void {
    this._store.dispatch(login({ data: user }));
    this.formGroup.reset();
    this.submitted = false;
  }

  private formInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl(''),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public onSubmit(): void {
    if (this.formGroup.invalid || (!this.registered && !this.formGroup.value.name.length)) {
      return
    };
    this.submitted = true;
    let user: IUserCreation;

    if (this.registered) {
      user = {
        email: this.formGroup.value.email,
        password: this.formGroup.value.password
      };
      this._signIn(user);
    } else {
      user = {
        email: this.formGroup.value.email,
        name: this.formGroup.value.name,
        password: this.formGroup.value.password
      };
      this._store.dispatch(register({ user: user }));
      this.submitted = false;
    }
  }

  public changeRegistered(registered: boolean): void {
    this.registered = registered;
    if(!registered){
      this.formGroup.controls['name'].addValidators([Validators.required])
    }
  }
}
