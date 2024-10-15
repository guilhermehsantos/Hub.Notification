import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729027109468 implements MigrationInterface {
    name = 'Migration1729027109468'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" RENAME COLUMN "companyRegistratorNumber" TO "companyRegistrationNumber"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" RENAME COLUMN "companyRegistrationNumber" TO "companyRegistratorNumber"`);
    }

}
