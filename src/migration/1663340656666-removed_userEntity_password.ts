import {MigrationInterface, QueryRunner} from "typeorm";

export class removedUserEntityPassword1663340656666 implements MigrationInterface {
    name = 'removedUserEntityPassword1663340656666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" DROP COLUMN "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user" ADD "password" character varying NOT NULL`);
    }

}
