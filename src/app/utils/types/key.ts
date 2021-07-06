/* eslint-disable */

export type Keys<T> = {
  [key in keyof T]: unknown;
};
