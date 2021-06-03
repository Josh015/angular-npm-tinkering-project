import { FormControl } from '@angular/forms';

export class CustomValidators {
  static y2k(control: FormControl): any {
    const date: Date | null = control.value;

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
  }

  static year2012(control: FormControl): any {
    const date: Date | null = control.value;

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
  }
}
