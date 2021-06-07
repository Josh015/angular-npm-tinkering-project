import { FormControl, ValidationErrors } from '@angular/forms';

export const y2kValidator = (control: FormControl): ValidationErrors | null => {
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

export const year2012Validator = (
  control: FormControl
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
