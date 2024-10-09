import { get } from 'env-var';

export class EnvConfig {
  public static readonly PORT = get('PORT').asPortNumber();
  public static readonly NODE_ENV = get('NODE_ENV').asString();
  public static readonly RABBITMQ_URL = get('RABBITMQ_URL').asString();
  public static readonly RABBITMQ_USER = get('RABBITMQ_USER').asString();
  public static readonly RABBITMQ_PASS = get('RABBITMQ_PASS').asString();

  //database
  public static readonly DATABASE_HOST = get('DATABASE_HOST').asString();
  public static readonly DATABASE_PORT = get('DATABASE_PORT').asPortNumber();
  public static readonly DATABASE_USERNAME =
    get('DATABASE_USERNAME').asString();
  public static readonly DATABASE_PASSWORD =
    get('DATABASE_PASSWORD').asString();
  public static readonly DATABASE = get('DATABASE').asString();
}
