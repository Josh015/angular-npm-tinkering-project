import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const year2012Validator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const date = control.value as Date | null;

  if (
    !date ||
    date.getFullYear() !== 2012 ||
    date.getMonth() !== 11 ||
    date.getDate() !== 21
  ) {
    return null;
  }

  return {
    year2012: true,
  };
};
