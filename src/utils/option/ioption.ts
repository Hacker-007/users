import { None, Some } from '.'
import { Result } from '../result'

type Option<T> = Some<T> | None

export interface IOption<T> {
  isSome(): this is Some<T>
  isNone(): this is None
  map<U>(fn: (value: T) => U): IOption<U>
  mapOr<U>(fn: (value: T) => U, defaultValue: U): IOption<U>
  mapOrElse<U>(fn: (value: T) => U, defaultValue: () => U): IOption<U>
  okOr<E>(error: E): Result<T, E>
  okOrElse<E>(error: () => E): Result<T, E>
  unwrap(): T
  unwrapOr(defaultValue: T): T
  unwrapOrElse(fn: () => T): T
  and<U>(res: IOption<U>): IOption<U>
  andThen<U>(fn: (value: T) => IOption<U>): IOption<U>
  or(res: IOption<T>): IOption<T>
  orElse(fn: () => IOption<T>): IOption<T>
}

export default Option
