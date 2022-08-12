import { Some } from '.'
import { Err, Result } from '../result'
import { IOption } from './ioption'

class None implements IOption<never> {
  isSome(): this is Some<never> {
    return false
  }

  isNone(): this is None {
    return true
  }

  map<U>(_fn: (value: never) => U): IOption<U> {
    return this
  }

  mapOr<U>(_fn: (value: never) => U, defaultValue: U): IOption<U> {
    return new Some(defaultValue)
  }

  mapOrElse<U>(fn: (value: never) => U, defaultValue: () => U): IOption<U> {
    return new Some(defaultValue())
  }

  okOr<E>(error: E): Result<never, E> {
    return new Err(error)
  }

  okOrElse<E>(error: () => E): Result<never, E> {
    return new Err(error())
  }

  unwrap(): never {
    throw new Error('Attempted to unwrap a `None` type.')
  }

  unwrapOr(defaultValue: never): never {
    return defaultValue
  }

  unwrapOrElse(fn: () => never): never {
    return fn()
  }

  and<U>(_res: IOption<U>): IOption<U> {
    return this
  }

  andThen<U>(_fn: (value: never) => IOption<U>): IOption<U> {
    return this
  }

  or(res: IOption<never>): IOption<never> {
    return res
  }

  orElse(fn: () => IOption<never>): IOption<never> {
    return fn()
  }
}

export default None
