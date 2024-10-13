import * as dotenv from 'dotenv';
import { get } from 'env-var';

dotenv.config();

export class EnvConfig {
  //server----------------------------------------------------------------------------------------
  public static readonly PORT = get('PORT').required().asPortNumber();
  public static readonly NODE_ENV = get('NODE_ENV').required().asString();

  //rabbitMQ--------------------------------------------------------------------------------------
  public static readonly RABBITMQ_URL = get('RABBITMQ_URL')
    .required()
    .asString();
  public static readonly RABBITMQ_USER = get('RABBITMQ_USER')
    .required()
    .asString();
  public static readonly RABBITMQ_PASS = get('RABBITMQ_PASS')
    .required()
    .asString();

  public static readonly RABBITMQ_URL_CONNECT = `amqp://${EnvConfig.RABBITMQ_USER}:${EnvConfig.RABBITMQ_PASS}@${EnvConfig.RABBITMQ_URL}`;

  public static readonly EXCHANGE = get('EXCHANGE').required().asString();
  public static readonly WHATSAPP_QUEUE_HIGH_PRIORITY = get(
    'WHATSAPP_QUEUE_HIGH_PRIORITY',
  )
    .required()
    .asString();

  public static readonly WHATSAPP_QUEUE_LOW_PRIORITY = get(
    'WHATSAPP_QUEUE_LOW_PRIORITY',
  )
    .required()
    .asString();

  //database--------------------------------------------------------------------------------------
  public static readonly DATABASE_HOST = get('DATABASE_HOST')
    .required()
    .asString();
  public static readonly DATABASE_PORT = get('DATABASE_PORT')
    .required()
    .asPortNumber();
  public static readonly DATABASE_USERNAME = get('DATABASE_USERNAME')
    .required()
    .asString();
  public static readonly DATABASE_PASSWORD = get('DATABASE_PASSWORD')
    .required()
    .asString();
  public static readonly DATABASE = get('DATABASE').required().asString();

  //ZPAI------------------------------------------------------------------------------------------
  public static readonly ZAPI_CLIENT_TOKEN = get('ZAPI_CLIENT')
    .required()
    .asString();

  public static readonly ZAPI_URL = get('ZAPI_URL').required().asString();

  public static readonly ZAPI_PARTNER_TOKEN = get('ZAPI_PARTNER_TOKEN')
    .required()
    .asString();
}
