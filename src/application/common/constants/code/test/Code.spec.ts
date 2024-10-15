import { Code } from '../code';

describe('Code', () => {
  it('should have a SUCCESS code with the correct values', () => {
    expect(Code.SUCCESS.code).toBe(200);
    expect(Code.SUCCESS.message).toBe('Success.');
  });

  it('should have a BAD_REQUEST_ERROR code with the correct values', () => {
    expect(Code.BAD_REQUEST_ERROR.code).toBe(400);
    expect(Code.BAD_REQUEST_ERROR.message).toBe('Bad request.');
  });

  it('should have an UNAUTHORIZED_ERROR code with the correct values', () => {
    expect(Code.UNAUTHORIZED_ERROR.code).toBe(401);
    expect(Code.UNAUTHORIZED_ERROR.message).toBe('Unauthorized error.');
  });

  it('should have a WRONG_CREDENTIALS_ERROR code with the correct values', () => {
    expect(Code.WRONG_CREDENTIALS_ERROR.code).toBe(402);
    expect(Code.WRONG_CREDENTIALS_ERROR.message).toBe('Wrong credentials.');
  });

  it('should have an INTERNAL_ERROR code with the correct values', () => {
    expect(Code.INTERNAL_ERROR.code).toBe(500);
    expect(Code.INTERNAL_ERROR.message).toBe('Internal error.');
  });

  it('should have an ENTITY_VALIDATION_ERROR code with the correct values', () => {
    expect(Code.ENTITY_VALIDATION_ERROR.code).toBe(1000);
    expect(Code.ENTITY_VALIDATION_ERROR.message).toBe(
      'Entity validation error.',
    );
  });

  it('should have an ENTITY_NOT_FOUND_ERROR code with the correct values', () => {
    expect(Code.ENTITY_NOT_FOUND_ERROR.code).toBe(1001);
    expect(Code.ENTITY_NOT_FOUND_ERROR.message).toBe('Entity not found.');
  });

  it('should have an ENTITY_ALREADY_EXISTS_ERROR code with the correct values', () => {
    expect(Code.ENTITY_ALREADY_EXISTS_ERROR.code).toBe(1002);
    expect(Code.ENTITY_ALREADY_EXISTS_ERROR.message).toBe(
      'Entity already exists.',
    );
  });

  it('should have a USE_CASE_PORT_VALIDATION_ERROR code with the correct values', () => {
    expect(Code.USE_CASE_PORT_VALIDATION_ERROR.code).toBe(1003);
    expect(Code.USE_CASE_PORT_VALIDATION_ERROR.message).toBe(
      'Use-case port validation error.',
    );
  });

  it('should have a MIDDLEWARE_VALIDATION_ERROR code with the correct values', () => {
    expect(Code.MIDDLEWARE_VALIDATION_ERROR.code).toBe(1004);
    expect(Code.MIDDLEWARE_VALIDATION_ERROR.message).toBe(
      'Middleware validation error.',
    );
  });

  it('should have a REQUEST_DATA_VALIDATION_ERROR code with the correct values', () => {
    expect(Code.REQUEST_DATA_VALIDATION_ERROR.code).toBe(1005);
    expect(Code.REQUEST_DATA_VALIDATION_ERROR.message).toBe(
      'Request data validation error.',
    );
  });

  it('should have a VALUE_OBJECT_VALIDATION_ERROR code with the correct values', () => {
    expect(Code.VALUE_OBJECT_VALIDATION_ERROR.code).toBe(1006);
    expect(Code.VALUE_OBJECT_VALIDATION_ERROR.message).toBe(
      'Value-object validation error.',
    );
  });
});
