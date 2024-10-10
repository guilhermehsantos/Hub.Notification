import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1728474497978 implements MigrationInterface {
  name = 'Migration1728474497978';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company" ADD "default" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "default"`);
  }
}
