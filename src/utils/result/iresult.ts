import { Err, Ok } from '.'
import { Option } from '../option'

type Result<T, E> = Ok<T> | Err<E>

export interface IResult<T, E> {
  isOk(): this is Ok<T>
  isErr(): this is Err<E>
  ok(): Option<T>
  err(): Option<E>
  map<U>(fn: (value: T) => U): IResult<U, E>
  mapOr<U>(fn: (value: T) => U, defaultValue: U): IResult<U, E>
  mapOrElse<U>(
    fn: (value: T) => U,
    defaultValue: (error: E) => U
  ): IResult<U, E>
  mapErr<F>(fn: (error: E) => F): IResult<T, F>
  unwrap(): T
  unwrapOr(defaultValue: T): T
  unwrapOrElse(fn: (error: E) => T): T
  unwrapErr(): E
  and<U>(res: IResult<U, E>): IResult<U, E>
  andThen<U>(fn: (value: T) => IResult<U, E>): IResult<U, E>
  or<F>(res: IResult<T, F>): IResult<T, F>
  orElse<F>(fn: (error: E) => IResult<T, F>): IResult<T, F>
}

export default Result
