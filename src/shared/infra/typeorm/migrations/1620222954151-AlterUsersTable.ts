import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterUsersTable1620222954151 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('users', new TableColumn({
      name: 'disabled',
      type: 'boolean',
      default: false,
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'disabled');
  }
}
