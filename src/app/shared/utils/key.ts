export type Keys<T> = {
  [key in keyof T]: any;
};
