import { IResult, Err } from '.'
import { None, Option, Some } from '../option'

class Ok<T> implements IResult<T, never> {
  constructor(readonly value: T) {}

  isOk(): this is Ok<T> {
    return true
  }

  isErr(): this is Err<never> {
    return false
  }

  ok(): Option<T> {
    return new Some(this.value)
  }

  err(): Option<never> {
    return new None()
  }

  map<U>(fn: (value: T) => U): IResult<U, never> {
    return new Ok(fn(this.value))
  }

  mapOr<U>(fn: (value: T) => U, _defaultValue: U): IResult<U, never> {
    return new Ok(fn(this.value))
  }

  mapOrElse<U>(
    fn: (value: T) => U,
    _defaultValue: (error: never) => U
  ): IResult<U, never> {
    return new Ok(fn(this.value))
  }

  mapErr<F>(_fn: (error: never) => F): IResult<T, F> {
    return this
  }

  unwrap(): T {
    return this.value
  }

  unwrapOr(_defaultValue: T): T {
    return this.value
  }

  unwrapOrElse(_fn: (error: never) => T): T {
    return this.value
  }

  unwrapErr(): never {
    throw new Error('Attempted to unwrapErr an `Ok` type.')
  }

  and<U>(res: IResult<U, never>): IResult<U, never> {
    return res
  }

  andThen<U>(fn: (value: T) => IResult<U, never>): IResult<U, never> {
    return fn(this.value)
  }

  or<F>(_res: IResult<T, F>): IResult<T, F> {
    return this
  }

  orElse<F>(_fn: (error: never) => IResult<T, F>): IResult<T, F> {
    return this
  }
}

export default Ok
