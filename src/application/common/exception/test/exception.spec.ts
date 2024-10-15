import { Exception } from '../exception';
import { CodeDescription } from '../../constants/code/Code';

const mockCodeDescription: CodeDescription = {
  code: 400,
  message: 'Bad Request',
};

describe('Exception', () => {
  it('should create an exception with default message', () => {
    const exception = new Exception(mockCodeDescription);

    expect(exception).toBeInstanceOf(Error);
    expect(exception.name).toBe('Exception');
    expect(exception.code).toBe(400);
    expect(exception.message).toBe('Bad Request');
    expect(exception.data).toBeUndefined();
  });

  it('should create an exception with overridden message', () => {
    const overrideMessage = 'Custom Error Message';
    const exception = new Exception(mockCodeDescription, overrideMessage);

    expect(exception.message).toBe(overrideMessage);
  });

  it('should create an exception with data', () => {
    const mockData = { key: 'value' };
    const exception = new Exception(mockCodeDescription, undefined, mockData);

    expect(exception.data).toEqual(mockData);
  });

  it('should create an exception using static method new()', () => {
    const payload = {
      code: mockCodeDescription,
      overrideMessage: 'Custom Error',
      data: { key: 'value' },
    };
    const exception = Exception.new(payload);

    expect(exception.code).toBe(400);
    expect(exception.message).toBe('Custom Error');
    expect(exception.data).toEqual(payload.data);
  });

  it('should capture the stack trace', () => {
    const exception = new Exception(mockCodeDescription);
    expect(exception.stack).toBeDefined();
  });
});
