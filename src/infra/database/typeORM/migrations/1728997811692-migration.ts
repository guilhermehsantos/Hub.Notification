import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728997811692 implements MigrationInterface {
    name = 'Migration1728997811692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instance_zapi" ADD "clientToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "instance_zapi" DROP COLUMN "clientToken"`);
    }

}
