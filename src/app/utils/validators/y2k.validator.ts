import { ValidationErrors, ValidatorFn } from '@angular/forms';

import { AbstractControlTyped } from '../helpers/typed-reactive-forms';

export const y2kValidator: ValidatorFn = (
  control: AbstractControlTyped<Date | null>
): ValidationErrors | null => {
  const date = control.value;

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
