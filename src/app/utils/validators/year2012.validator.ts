import { ValidationErrors, ValidatorFn } from '@angular/forms';

import { AbstractControlTyped } from '../helpers/typed-reactive-forms';

export const year2012Validator: ValidatorFn = (
  control: AbstractControlTyped<Date | null>
): ValidationErrors | null => {
  const date = control.value;

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
