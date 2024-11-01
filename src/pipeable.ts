export class Pipeable<T> {
  value: T;

  constructor(value: T) {
    this.value = value;
  }

  pipe(...fns: ((p: any) => any)[]): any {
    return fns.reduce((v, f) => f(v), this.value);
  }
}

export const toPipeable = <T>(value: T) => new Pipeable<T>(value);
