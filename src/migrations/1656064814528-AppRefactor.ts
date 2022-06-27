import { MigrationInterface, QueryRunner } from "typeorm"

export class AppRefactor1656064814528 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `alter table "app" rename column "name" to "title"`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `alter table "app" rename column "title" to "name"`
        )
    }
}
