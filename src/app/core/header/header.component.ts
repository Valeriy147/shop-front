import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { logout } from '../../auth/store/auth.actions';
import { getUserData } from '../get-user-data.constant';
import { AuthFeature } from 'src/app/auth/store/auth.reducer';
import { MatDialog } from '@angular/material/dialog';
import { BagDialogComponent } from 'src/app/bag/bag-dialog/bag-dialog.component';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [SharedModule, CommonModule]
})
export class HeaderComponent implements OnInit {

  public userEmail: string = getUserData().email;

  constructor(
    private _store: Store,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._store.select(AuthFeature.selectUserLogin).subscribe((email)=>{
      email ? this.userEmail = email : ''
    })
  }

  public logout(): void {
    this._store.dispatch(logout());
    this.userEmail = '';
  }

  public setEmail(): void{
    this.userEmail = getUserData().email
  }


  openCartDialog(): void {
    this.dialog.open(BagDialogComponent, {
      width: '500px'
    });
  }
}
