/* eslint-disable */

import {
  AbstractControl,
  AbstractControlOptions,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Observable } from 'rxjs';

// TODO: Add factories for FormControl and FormArray?

/**
 * Instantiate a `FormGroupTyped` while requiring that the field names of the
 * passed in definition object match the field names of `T`.
 */
export function newFormGroupTyped<T extends {}>(
  controlsConfig: {
    [key in keyof T]: any;
  },
  options?: AbstractControlOptions | null
): FormGroupTyped<T> {
  return new FormGroup(controlsConfig, options) as FormGroupTyped<T>;
}

// Code below sourced from:
// https://gist.github.com/dmorosinotto/76a9272b5c45af1f78a61e7894df5777

//BASIC TYPES DEFINED IN @angular/forms + rxjs/Observable

type Status = 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED'; //<- I don't know why Angular Team doesn't define it https://github.com/angular/angular/blob/7.2.7/packages/forms/src/model.ts#L15-L45)
type StatusOrString = Status | string; //<- string is added only because Angular base class use string instead of union type https://github.com/angular/angular/blob/7.2.7/packages/forms/src/model.ts#L196)

//OVERRIDE TYPES WITH STRICT TYPED INTERFACES + SOME TYPE TRICKS TO COMPOSE INTERFACE (https://github.com/Microsoft/TypeScript/issues/16936)
export interface AbstractControlTyped<T> extends AbstractControl {
  // BASE PROPS AND METHODS COMMON TO ALL FormControl/FormGroup/FormArray
  readonly value: T;
  valueChanges: Observable<T>;
  readonly status: StatusOrString;
  statusChanges: Observable<Status>;
  get<V = unknown>(
    path: Array<string | number> | string
  ): AbstractControlTyped<V> | null;
  setValue<V>(
    value: V extends T ? V : never,
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ): void;
  patchValue<V>(
    value: V extends Partial<T> ? V : never,
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ): void;
  reset<V>(
    value?: V extends Partial<T> ? V : never,
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ): void;
}

export interface FormControlTyped<T> extends FormControl {
  // COPIED FROM AbstractControlTyped<T> BECAUSE TS NOT SUPPORT MULTIPLE extends FormControl, AbstractControlTyped<T>
  readonly value: T;
  valueChanges: Observable<T>;
  readonly status: StatusOrString;
  statusChanges: Observable<Status>;
  get<V = unknown>(
    path: Array<string | number> | string
  ): AbstractControlTyped<V> | null;
  setValue<V>(
    value: V extends T ? V : never,
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ): void;
  patchValue<V>(
    value: V extends Partial<T> ? V : never,
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ): void;
  reset<V>(
    value?: V extends Partial<T> ? V : never,
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ): void;
}

export interface FormGroupTyped<T> extends FormGroup {
  // PROPS AND METHODS SPECIFIC OF FormGroup
  //controls: { [P in keyof T | string]: AbstractControlTyped<P extends keyof T ? T[P] : any> };
  controls: { [P in keyof T]: AbstractControlTyped<T[P]> };
  registerControl<P extends keyof T>(
    name: P,
    control: AbstractControlTyped<T[P]>
  ): AbstractControlTyped<T[P]>;
  registerControl<V = any>(
    name: string,
    control: AbstractControlTyped<V>
  ): AbstractControlTyped<V>;
  addControl<P extends keyof T>(
    name: P,
    control: AbstractControlTyped<T[P]>
  ): void;
  addControl<V = any>(name: string, control: AbstractControlTyped<V>): void;
  removeControl(name: keyof T): void;
  removeControl(name: string): void;
  setControl<P extends keyof T>(
    name: P,
    control: AbstractControlTyped<T[P]>
  ): void;
  setControl<V = any>(name: string, control: AbstractControlTyped<V>): void;
  contains(name: keyof T): boolean;
  contains(name: string): boolean;
  get<P extends keyof T>(path: P): AbstractControlTyped<T[P]>;
  getRawValue(): T & { [disabledProp in string | number]: any };
  // COPIED FROM AbstractControlTyped<T> BECAUSE TS NOT SUPPORT MULTIPLE extends FormGroup, AbstractControlTyped<T>
  readonly value: T;
  valueChanges: Observable<T>;
  readonly status: StatusOrString;
  statusChanges: Observable<Status>;
  get<V = unknown>(
    path: Array<string | number> | string
  ): AbstractControlTyped<V> | null;
  setValue<V>(
    value: V extends T ? V : never,
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ): void;
  patchValue<V>(
    value: V extends Partial<T> ? V : never,
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ): void;
  reset<V>(
    value?: V extends Partial<T> ? V : never,
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ): void;
}

export interface FormArrayTyped<T> extends FormArray {
  // PROPS AND METHODS SPECIFIC OF FormGroup
  controls: AbstractControlTyped<T>[];
  at(index: number): AbstractControlTyped<T>;
  push<V = T>(ctrl: AbstractControlTyped<V>): void;
  insert<V = T>(index: number, control: AbstractControlTyped<V>): void;
  setControl<V = T>(index: number, control: AbstractControlTyped<V>): void;
  getRawValue(): T[];
  // COPIED FROM AbstractControlTyped<T[]> BECAUSE TS NOT SUPPORT MULTIPLE extends FormArray, AbstractControlTyped<T[]>
  readonly value: T[];
  valueChanges: Observable<T[]>;
  readonly status: StatusOrString;
  statusChanges: Observable<Status>;
  get<V = unknown>(
    path: Array<string | number> | string
  ): AbstractControlTyped<V> | null;
  setValue<V>(
    value: V extends T[] ? V : never,
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ): void;
  patchValue<V>(
    value: V extends Partial<T>[] ? V : never,
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ): void;
  reset<V>(
    value?: V extends Partial<T>[] ? V : never,
    options?: { onlySelf?: boolean; emitEvent?: boolean }
  ): void;
}
