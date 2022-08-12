import { Ok, Result } from '../result'
import { IOption } from './ioption'
import None from './none'

class Some<T> implements IOption<T> {
  constructor(readonly value: T) {}

  isSome(): this is Some<T> {
    return true
  }

  isNone(): this is None {
    return false
  }

  map<U>(fn: (value: T) => U): IOption<U> {
    return new Some(fn(this.value))
  }

  mapOr<U>(fn: (value: T) => U, _defaultValue: U): IOption<U> {
    return new Some(fn(this.value))
  }

  mapOrElse<U>(fn: (value: T) => U, _defaultValue: () => U): IOption<U> {
    return new Some(fn(this.value))
  }

  okOr<E>(_error: E): Result<T, E> {
    return new Ok(this.value)
  }

  okOrElse<E>(_error: () => E): Result<T, E> {
    return new Ok(this.value)
  }

  unwrap(): T {
    return this.value
  }

  unwrapOr(_defaultValue: T): T {
    return this.value
  }

  unwrapOrElse(_fn: () => T): T {
    return this.value
  }

  and<U>(res: IOption<U>): IOption<U> {
    return res
  }

  andThen<U>(fn: (value: T) => IOption<U>): IOption<U> {
    return fn(this.value)
  }

  or(_res: IOption<T>): IOption<T> {
    return this
  }

  orElse(_fn: () => IOption<T>): IOption<T> {
    return this
  }
}

export default Some
