import { FormControl } from '@angular/forms';

/**
 * When casting a `FormGroup` config object with this type it will constrain
 * the object's field names to the fields present in `T` and ensure that they
 * are affected by refactor commands.
 */
export type ControlsGroup<T> = { [k in keyof T]: FormControl };
