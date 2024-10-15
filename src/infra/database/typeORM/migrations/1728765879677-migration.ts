import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1728765879677 implements MigrationInterface {
  name = 'Migration1728765879677';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "companyRegistrationNumber" character varying(20) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "status" integer NOT NULL, "deleted" boolean NOT NULL DEFAULT false, "default" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "phone_number" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyId" uuid NOT NULL, "phoneNumber" character varying(20) NOT NULL, "deleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c16f58426537a660b3f2a26e983" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "black_list_phone" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "instanceZAPIId" uuid NOT NULL, "name" character varying(255) NOT NULL, "deleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fbe86da38448bd0a57cb9b9a3b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "instance_zapi" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phoneNumberId" uuid NOT NULL, "token" character varying NOT NULL, "code" character varying, "type" integer NOT NULL, "status" integer NOT NULL, "createdBy" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_d996e77b0ecb05af3918a23fd95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "message_template" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "companyId" uuid NOT NULL, "name" character varying(255) NOT NULL, "status" integer NOT NULL, "description" character varying, "body" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "provider" integer NOT NULL, "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_616800da109c721fb4dd2019a9b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "key" character varying(255) NOT NULL, "deleted" boolean NOT NULL DEFAULT false, "status" integer NOT NULL DEFAULT '1', "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "product"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "message_template"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "instance_zapi"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "black_list_phone"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "phone_number"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "company"`);
  }
}
