import { MigrationInterface, QueryRunner } from "typeorm";

export class alterTableGuardians1662727504792 implements MigrationInterface {
    name = 'alterTableGuardians1662727504792'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guardians" ADD "password" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "guardians" DROP COLUMN "password"`);
    }

}
