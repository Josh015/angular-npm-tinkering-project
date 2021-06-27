import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const y2kValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const date = control.value as Date | null;

  if (
    !date ||
    date.getFullYear() !== 2000 ||
    date.getMonth() !== 0 ||
    date.getDate() !== 1
  ) {
    return null;
  }

  return {
    y2k: true,
  };
};
