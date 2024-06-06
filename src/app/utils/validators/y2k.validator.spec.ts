import { FormControl } from '@angular/forms';

import { y2kValidator } from './y2k.validator';
import { randomDate } from 'src/app/testing';

describe(`y2kValidator`, () => {
  const doomsday = new Date('January 1, 2000 00:00:00');

  it(`should return validation error on the start of Y2K`, () => {
    const control = new FormControl(doomsday);
    const result = y2kValidator(control);

    expect(result).not.toBeNull();
    expect(result).toEqual({
      y2k: true
    });
  });

  it(`should return null for any other date`, () => {
    let date: Date;

    do {
      date = randomDate();
    } while (date.getTime() === doomsday.getTime());

    const control = new FormControl(date);
    const result = y2kValidator(control);

    expect(result).toBeNull();
  });
});
