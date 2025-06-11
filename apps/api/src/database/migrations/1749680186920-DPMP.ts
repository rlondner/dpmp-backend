import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPMP1749680186920 implements MigrationInterface {
  name = 'DPMP1749680186920';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "status" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "socialId" character varying, "firstName" character varying, "lastName" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "photoId" uuid, "roleId" integer, "statusId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_75e2be4ce11d447ef43be0e374" UNIQUE ("photoId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "organization" ("subscription" character varying NOT NULL, "description" character varying, "slug" character varying NOT NULL, "name" character varying NOT NULL, "id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "permission" ("active" boolean NOT NULL, "description" character varying, "slug" character varying NOT NULL, "id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role" ("active" boolean NOT NULL, "name" character varying NOT NULL, "id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb2e442d14add3cefbdf33c4561" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("country" character varying NOT NULL, "state" character varying, "city" character varying NOT NULL, "postalCode" character varying NOT NULL, "line3" character varying, "line2" character varying, "line1" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_role_permissions_permission" ("userRoleId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_27a1de268ae064dab970c081609" PRIMARY KEY ("userRoleId", "permissionId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_06012ed04be71b8bef3a3968ea" ON "user_role_permissions_permission" ("userRoleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0ca2057b5085083ff9f18e3f9" ON "user_role_permissions_permission" ("permissionId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_permissions_permission" ("userId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_8dd49853fbad35f9a0f91b11877" PRIMARY KEY ("userId", "permissionId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5b72d197d92b8bafbe7906782e" ON "user_permissions_permission" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c43a6a56e3ef281cbfba9a7745" ON "user_permissions_permission" ("permissionId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles_user_role" ("userId" integer NOT NULL, "userRoleId" integer NOT NULL, CONSTRAINT "PK_cd5bf7bedcc5f7671f0a97b9224" PRIMARY KEY ("userId", "userRoleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc94447a3cabad70eb2c96f5e1" ON "user_roles_user_role" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4698620c2fcf96fdbabb09f384" ON "user_roles_user_role" ("userRoleId") `,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "REL_75e2be4ce11d447ef43be0e374"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoId"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "user" ADD "photoId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_75e2be4ce11d447ef43be0e374f" UNIQUE ("photoId")`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "isSuperUser" boolean`);
    await queryRunner.query(`ALTER TABLE "user" ADD "orgId" integer`);
    await queryRunner.query(
      `ALTER TABLE "status" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "statusId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "roleId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "provider" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "provider" DROP DEFAULT`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "status_id_seq" OWNED BY "status"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ALTER COLUMN "id" SET DEFAULT nextval('"status_id_seq"')`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_4f5adb58513c2fe57eb9c79cc16" FOREIGN KEY ("orgId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_permissions_permission" ADD CONSTRAINT "FK_06012ed04be71b8bef3a3968ead" FOREIGN KEY ("userRoleId") REFERENCES "user_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_permissions_permission" ADD CONSTRAINT "FK_f0ca2057b5085083ff9f18e3f95" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permissions_permission" ADD CONSTRAINT "FK_5b72d197d92b8bafbe7906782ec" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permissions_permission" ADD CONSTRAINT "FK_c43a6a56e3ef281cbfba9a77457" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_user_role" ADD CONSTRAINT "FK_dc94447a3cabad70eb2c96f5e1d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_user_role" ADD CONSTRAINT "FK_4698620c2fcf96fdbabb09f3844" FOREIGN KEY ("userRoleId") REFERENCES "user_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_roles_user_role" DROP CONSTRAINT "FK_4698620c2fcf96fdbabb09f3844"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_user_role" DROP CONSTRAINT "FK_dc94447a3cabad70eb2c96f5e1d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permissions_permission" DROP CONSTRAINT "FK_c43a6a56e3ef281cbfba9a77457"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_permissions_permission" DROP CONSTRAINT "FK_5b72d197d92b8bafbe7906782ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_permissions_permission" DROP CONSTRAINT "FK_f0ca2057b5085083ff9f18e3f95"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_permissions_permission" DROP CONSTRAINT "FK_06012ed04be71b8bef3a3968ead"`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_4f5adb58513c2fe57eb9c79cc16"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "status_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "provider" SET DEFAULT 'email'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "provider" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "roleId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "statusId" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "orgId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isSuperUser"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "photoId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "REL_75e2be4ce11d447ef43be0e374" UNIQUE ("photoId")`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4698620c2fcf96fdbabb09f384"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_dc94447a3cabad70eb2c96f5e1"`,
    );
    await queryRunner.query(`DROP TABLE "user_roles_user_role"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c43a6a56e3ef281cbfba9a7745"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5b72d197d92b8bafbe7906782e"`,
    );
    await queryRunner.query(`DROP TABLE "user_permissions_permission"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0ca2057b5085083ff9f18e3f9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_06012ed04be71b8bef3a3968ea"`,
    );
    await queryRunner.query(`DROP TABLE "user_role_permissions_permission"`);
    await queryRunner.query(`DROP TABLE "address"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "user_role"`);
    await queryRunner.query(`DROP TABLE "permission"`);
    await queryRunner.query(`DROP TABLE "organization"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "status"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
