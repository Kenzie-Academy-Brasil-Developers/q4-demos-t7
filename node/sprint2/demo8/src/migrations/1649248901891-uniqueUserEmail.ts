import {MigrationInterface, QueryRunner} from "typeorm";

export class uniqueUserEmail1649248901891 implements MigrationInterface {
    name = 'uniqueUserEmail1649248901891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_date" SET DEFAULT '"2022-04-06T12:41:43.613Z"'`);
        await queryRunner.query(`ALTER TABLE "invoices" ALTER COLUMN "release_date" SET DEFAULT '"2022-04-06T12:41:43.613Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invoices" ALTER COLUMN "release_date" SET DEFAULT '2022-04-05 12:32:02.181'`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_date" SET DEFAULT '2022-04-05 12:32:02.123'`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
    }

}
