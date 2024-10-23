import { AbstractControl, ValidatorFn } from "@angular/forms";
import { emailPattern, notStartingOrEndingWithWhitespace } from "../patterns/common-patterns";

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const valid = emailPattern.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }

  export function whiteSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const valid = notStartingOrEndingWithWhitespace.test(control.value);
      return valid ? null : { whiteSpace: true };
    };
  }