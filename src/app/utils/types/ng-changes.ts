/* eslint-disable */

// Added Partial<> since all change fields are potentially undefined!
// https://netbasal.com/create-a-typed-version-of-simplechanges-in-angular-451f86593003
type MarkFunctionProperties<Component> = {
  [Key in keyof Component]: Component[Key] extends Function ? never : Key;
};
type ExcludeFunctionPropertyNames<T> = MarkFunctionProperties<T>[keyof T];
type ExcludeFunctions<T> = Pick<T, ExcludeFunctionPropertyNames<T>>;
export type NgChanges<
  Component,
  Props = ExcludeFunctions<Component>
> = Partial<{
  [Key in keyof Props]: {
    previousValue: Props[Key];
    currentValue: Props[Key];
    firstChange: boolean;
    isFirstChange(): boolean;
  };
}>;
/* eslint-enable */
