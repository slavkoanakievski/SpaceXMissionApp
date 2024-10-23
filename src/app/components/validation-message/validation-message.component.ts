import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'sxm-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrl: './validation-message.component.scss'
})
export class ValidationMessageComponent {
  @Input() validationErrors: ValidationErrors | null;
  @Input() customErrors: { [key: string]: string };
  @Input() useOnlyCustomErrors = false;
}
