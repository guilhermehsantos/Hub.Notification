import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1729015962283 implements MigrationInterface {
  name = 'Migration1729015962283';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company" RENAME COLUMN "cnpj" TO "companyRegistrationNumber"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company" RENAME COLUMN "companyRegistrationNumber" TO "cnpj"`,
    );
  }
}
