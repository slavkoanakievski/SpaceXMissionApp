import { Component, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
export interface InputConfig {
  debounceTime: number;
  minKeyStrokes: number;
}

@Component({
  selector: 'sxm-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent,
    },
  ],
})
export class InputComponent implements ControlValueAccessor{
  @Input() inputConfig: InputConfig = {
    debounceTime: 350,
    minKeyStrokes: 0,
  };

  @Input() label = '';
  @Input() placeholder = '';
  @Input() cssClass: string | string[] | Set<string> | { [klass: string]: any };
  @Input() isRequired = false;
  @Input() type = 'text';

  value: string | null;
  disabled = false;
  onChange: (content: any) => {};
  onTouched: (content: any) => {};

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
