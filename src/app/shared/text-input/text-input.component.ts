import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Self,
  Optional
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, ValidationErrors } from '@angular/forms';

import { BaseField } from '../directives/base-field.directive';
import { SharedModule } from '../shared.module';

@Component({
  standalone: true,
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  imports: [SharedModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TextInputComponent implements ControlValueAccessor, BaseField {

  @Input() label!: string
  @Input() type: string = 'text'
  @Input() value: string | undefined;
  @Input() error: any;

  onChange = (value: string) => { };
  onTouched!: () => void;

  constructor(
    @Optional() @Self() private readonly ngControl: NgControl,
    private readonly changeDetector: ChangeDetectorRef,
  ) {
    if (ngControl) {
      this.ngControl.valueAccessor = this;

    }
  }

  public onEditorValueChange(event: Event): void {
    const targetInputElement = event.target as HTMLInputElement;
    const content = targetInputElement.value;

    this.onChange(content);
  }

  public writeValue(value: string): void {
    this.value = value;

    this.changeDetector.detectChanges();
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.value) {
      return { required: true };
    }
    return null;
  }
}

