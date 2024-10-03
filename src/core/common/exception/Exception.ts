import { CodeDescription } from '../code/Code';
import { Optional } from '../type/CommonTypes';

export type CreateExceptionPayload<TData> = {
  code: CodeDescription;
  overrideMessage?: string;
  data?: TData;
};

export class Exception<TData> extends Error {
  public readonly code: number;

  public readonly data: Optional<TData>;

  constructor(code: CodeDescription, overrideMessage?: string, data?: TData) {
    super();

    this.name = this.constructor.name;
    this.code = code.code;
    this.message = overrideMessage || code.message;
    this.data = data;

    Error.captureStackTrace(this, this.constructor);
  }

  public static new<TData>(
    payload: CreateExceptionPayload<TData>,
  ): Exception<TData> {
    return new Exception(payload.code, payload.overrideMessage, payload.data);
  }
}
