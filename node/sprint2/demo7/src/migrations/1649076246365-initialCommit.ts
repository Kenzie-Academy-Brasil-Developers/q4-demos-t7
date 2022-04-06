import { MigrationInterface, QueryRunner } from "typeorm";
import dotenv from "dotenv";
import { hashSync } from "bcrypt";
dotenv.config();

export class initialCommit1649076246365 implements MigrationInterface {
  name = "initialCommit1649076246365";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdmin" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `INSERT INTO "users" ("name", "email", "password", "isAdmin") VALUES ('${
        process.env.ADMIN_NAME
      }', '${process.env.ADMIN_EMAIL}', '${hashSync(
        process.env.ADMIN_PASSWORD,
        10
      )}', true)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
