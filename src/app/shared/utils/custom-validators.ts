import { FormControl } from '@angular/forms';

export class CustomValidators {
  static readonly y2k = (control: FormControl): unknown => {
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

  static readonly year2012 = (control: FormControl): unknown => {
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
}
