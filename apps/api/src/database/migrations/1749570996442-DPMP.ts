import { MigrationInterface, QueryRunner } from 'typeorm';

export class DPMP1749570996442 implements MigrationInterface {
  name = 'DPMP1749570996442';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_4f5adb58513c2fe57eb9c79cc16"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_0c1333b59d03bd3dfba08de493a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`,
    );
    await queryRunner.query(
      `CREATE TABLE "permission" ("active" boolean NOT NULL, "description" character varying, "slug" character varying NOT NULL, "id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
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
      `CREATE TABLE "user_role2_user_role" ("userId" integer NOT NULL, "userRoleId" integer NOT NULL, CONSTRAINT "PK_d3cee04f14faec0926244bdd58b" PRIMARY KEY ("userId", "userRoleId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c8cdfc4dd09660248918d429f5" ON "user_role2_user_role" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2250d5092cd7aa65685839091b" ON "user_role2_user_role" ("userRoleId") `,
    );
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "orgId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role2Id"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoId"`);
    await queryRunner.query(
      `ALTER TABLE "user_role" ADD "active" boolean NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "user" ADD "photoId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_75e2be4ce11d447ef43be0e374f" UNIQUE ("photoId")`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "orgId" integer`);
    await queryRunner.query(
      `ALTER TABLE "status" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "status_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "statusId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "roleId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "provider" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "provider" DROP DEFAULT`,
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
      `ALTER TABLE "user_role_permissions_permission" ADD CONSTRAINT "FK_06012ed04be71b8bef3a3968ead" FOREIGN KEY ("userRoleId") REFERENCES "user_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_permissions_permission" ADD CONSTRAINT "FK_f0ca2057b5085083ff9f18e3f95" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role2_user_role" ADD CONSTRAINT "FK_c8cdfc4dd09660248918d429f59" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role2_user_role" ADD CONSTRAINT "FK_2250d5092cd7aa65685839091be" FOREIGN KEY ("userRoleId") REFERENCES "user_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_role2_user_role" DROP CONSTRAINT "FK_2250d5092cd7aa65685839091be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role2_user_role" DROP CONSTRAINT "FK_c8cdfc4dd09660248918d429f59"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_permissions_permission" DROP CONSTRAINT "FK_f0ca2057b5085083ff9f18e3f95"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_role_permissions_permission" DROP CONSTRAINT "FK_06012ed04be71b8bef3a3968ead"`,
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
      `DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "provider" SET DEFAULT 'email'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "provider" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "roleId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "statusId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "status_id_seq" OWNED BY "status"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ALTER COLUMN "id" SET DEFAULT nextval('"status_id_seq"')`,
    );
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "orgId"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_75e2be4ce11d447ef43be0e374f"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photoId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "user_role" DROP COLUMN "active"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "photoId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_75e2be4ce11d447ef43be0e374f" UNIQUE ("photoId")`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "user" ADD "role2Id" integer`);
    await queryRunner.query(`ALTER TABLE "user" ADD "orgId" integer`);
    await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
    await queryRunner.query(
      `ALTER TABLE "status" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2250d5092cd7aa65685839091b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c8cdfc4dd09660248918d429f5"`,
    );
    await queryRunner.query(`DROP TABLE "user_role2_user_role"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f0ca2057b5085083ff9f18e3f9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_06012ed04be71b8bef3a3968ea"`,
    );
    await queryRunner.query(`DROP TABLE "user_role_permissions_permission"`);
    await queryRunner.query(`DROP TABLE "permission"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_0c1333b59d03bd3dfba08de493a" FOREIGN KEY ("role2Id") REFERENCES "user_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_4f5adb58513c2fe57eb9c79cc16" FOREIGN KEY ("orgId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
