import { IResult, Ok } from '.'
import { None, Option, Some } from '../option'

class Err<E> implements IResult<never, E> {
  constructor(readonly error: E) {}

  isOk(): this is Ok<never> {
    return false
  }

  isErr(): this is Err<E> {
    return true
  }

  ok(): Option<never> {
    return new None()
  }

  err(): Option<E> {
    return new Some(this.error)
  }

  map<U>(_fn: (value: never) => U): IResult<U, E> {
    return this
  }

  mapOr<U>(fn: (value: never) => U, defaultValue: U): IResult<U, E> {
    return new Ok(defaultValue)
  }

  mapOrElse<U>(
    fn: (value: never) => U,
    defaultValue: (error: E) => U
  ): IResult<U, E> {
    return new Ok(defaultValue(this.error))
  }

  mapErr<F>(fn: (error: E) => F): IResult<never, F> {
    return new Err(fn(this.error))
  }

  unwrap(): never {
    throw new Error('Attempted to unwrap an `Err` type.')
  }

  unwrapOr(defaultValue: never): never {
    return defaultValue
  }

  unwrapOrElse(fn: (error: E) => never): never {
    return fn(this.error)
  }

  unwrapErr(): E {
    return this.error
  }

  and<U>(_res: IResult<U, E>): IResult<U, E> {
    return this
  }

  andThen<U>(_fn: (value: never) => IResult<U, E>): IResult<U, E> {
    return this
  }

  or<F>(res: IResult<never, F>): IResult<never, F> {
    return res
  }

  orElse<F>(fn: (error: E) => IResult<never, F>): IResult<never, F> {
    return fn(this.error)
  }
}

export default Err
