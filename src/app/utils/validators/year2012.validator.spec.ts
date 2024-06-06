import { FormControl } from '@angular/forms';

import { year2012Validator } from './year2012.validator';
import { randomDate } from 'src/app/testing';

describe(`year2012Validator`, () => {
  const doomsday = new Date('December 21, 2012 00:00:00');

  it(`should return validation error on Mayan doomsday`, () => {
    const control = new FormControl(doomsday);
    const result = year2012Validator(control);

    expect(result).not.toBeNull();
    expect(result).toEqual({
      year2012: true
    });
  });

  it(`should return null for any other date`, () => {
    let date: Date;

    do {
      date = randomDate();
    } while (date.getTime() === doomsday.getTime());

    const control = new FormControl(date);
    const result = year2012Validator(control);

    expect(result).toBeNull();
  });
});
