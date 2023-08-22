import { MigrationInterface, QueryRunner } from 'typeorm';

export class FakePosts1689792367512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``);
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
