import { Directive, Input, OnInit, forwardRef, Inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Directive({
  selector: '[appErrorHandling]'
})
export class ErrorHandlingDirective implements OnInit {
  @Input('appErrorHandling') validatorName!: string;

  constructor(
    private control: NgControl,
    @Inject(forwardRef(() => NG_VALUE_ACCESSOR)) private valueAccessor: ControlValueAccessor
  ) { }

  ngOnInit() {
    this.control.control!.setValidators(this.control.control!.validator);
    this.control.control!.updateValueAndValidity();
    this.control.control!.statusChanges.subscribe(() => {
      const errors = this.control.control!.errors;
      if (errors && errors[this.validatorName]) {
        console.error('Validator error:', this.validatorName);
      }
    });

    if (this.valueAccessor && this.valueAccessor.registerOnChange) {
      this.valueAccessor.registerOnChange(() => {
        this.control.control!.updateValueAndValidity();
      });
    }

    if (this.valueAccessor && this.valueAccessor.registerOnTouched) {
      this.valueAccessor.registerOnTouched(() => {
        this.control.control!.markAsTouched();
      });
    }
  }
}
