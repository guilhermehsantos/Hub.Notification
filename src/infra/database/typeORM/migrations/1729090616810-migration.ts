import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729090616810 implements MigrationInterface {
    name = 'Migration1729090616810'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "black_list_phone" ADD "updated" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "black_list_phone" DROP COLUMN "updated"`);
    }

}
