export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined';
}

export function isNull(value: any): value is null {
  return value === null;
}

export function isNil(value: any): value is null | undefined {
  return isNull(value) || isUndefined(value);
}

export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export function isNumberFinite(value: any): value is number {
  return isNumber(value) && isFinite(value);
}
