import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1662649244388 implements MigrationInterface {
    name = 'createTables1662649244388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teachers" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "subject" character varying, "bio" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_7568c49a630907119e4a665c605" UNIQUE ("email"), CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "guardians" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "cellNumber" character varying, CONSTRAINT "UQ_2822ea52513239fdd508c016e3b" UNIQUE ("email"), CONSTRAINT "PK_3dcf02f3dc96a2c017106f280be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "age" integer, "isActive" boolean NOT NULL DEFAULT true, "guardianId" uuid, CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE ("email"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classes" ("id" uuid NOT NULL, "name" character varying NOT NULL, "hour" character varying NOT NULL, "isOpen" boolean NOT NULL DEFAULT true, "teacherId" uuid, CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "classes_students_students" ("classesId" uuid NOT NULL, "studentsId" uuid NOT NULL, CONSTRAINT "PK_44e7ec4f9fe28191e1c044dd198" PRIMARY KEY ("classesId", "studentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d96b611e61c20a152a99d62cdb" ON "classes_students_students" ("classesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_934c850b62cfa4f202c17d55e5" ON "classes_students_students" ("studentsId") `);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_22b7328b0b586a40dbe658895d3" FOREIGN KEY ("guardianId") REFERENCES "guardians"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes" ADD CONSTRAINT "FK_4b7ac7a7eb91f3e04229c7c0b6f" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "classes_students_students" ADD CONSTRAINT "FK_d96b611e61c20a152a99d62cdbf" FOREIGN KEY ("classesId") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "classes_students_students" ADD CONSTRAINT "FK_934c850b62cfa4f202c17d55e5e" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "classes_students_students" DROP CONSTRAINT "FK_934c850b62cfa4f202c17d55e5e"`);
        await queryRunner.query(`ALTER TABLE "classes_students_students" DROP CONSTRAINT "FK_d96b611e61c20a152a99d62cdbf"`);
        await queryRunner.query(`ALTER TABLE "classes" DROP CONSTRAINT "FK_4b7ac7a7eb91f3e04229c7c0b6f"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_22b7328b0b586a40dbe658895d3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_934c850b62cfa4f202c17d55e5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d96b611e61c20a152a99d62cdb"`);
        await queryRunner.query(`DROP TABLE "classes_students_students"`);
        await queryRunner.query(`DROP TABLE "classes"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "guardians"`);
        await queryRunner.query(`DROP TABLE "teachers"`);
    }

}
