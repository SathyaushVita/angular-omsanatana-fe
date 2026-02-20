import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom validator to check if the URL starts with 'https://'
export function httpsUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && !value.startsWith('https://')) {
      return { 'invalidUrl': true }; // Return error if URL doesn't start with 'https://'
    }
    return null; // No error if URL is valid
  };
}
