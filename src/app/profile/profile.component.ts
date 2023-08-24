import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { getUserData } from '../core/get-user-data.constant';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { TextInputComponent } from '../shared/text-input/text-input.component';
import { IUser } from '../auth/store/interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './services/profile.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [CommonModule, MatIconModule, SharedModule, TextInputComponent]
})
export class ProfileComponent implements OnInit{
  private _profileService = inject(ProfileService)
  public user: IUser = getUserData();
  public formGroup!: FormGroup;

  ngOnInit(): void {
    this.formInit();
  }

  private formInit(): void {
    let name: string = '';
    localStorage.getItem('name') ? name = localStorage.getItem('name')! : name = getUserData().name;

    this.formGroup = new FormGroup({
      name: new FormControl(name, [Validators.required]),
    });
  }

  public onSubmit(): void{
    if(this.formGroup.invalid){
      return;
    }
    this._profileService.changeName(this.formGroup.value.name, getUserData().email, getUserData().id).subscribe((data)=> {
      localStorage.setItem('name', data.name);
      this.user.name = data.name;
    })

  }
}
