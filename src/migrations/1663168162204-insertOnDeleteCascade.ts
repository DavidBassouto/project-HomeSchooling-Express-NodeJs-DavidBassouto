import { MigrationInterface, QueryRunner } from "typeorm";

export class insertOnDeleteCascade1663168162204 implements MigrationInterface {
    name = 'insertOnDeleteCascade1663168162204'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "FK_4b7ac7a7eb91f3e04229c7c0b6f"`);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "FK_4b7ac7a7eb91f3e04229c7c0b6f" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "FK_4b7ac7a7eb91f3e04229c7c0b6f"`);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "FK_4b7ac7a7eb91f3e04229c7c0b6f" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
