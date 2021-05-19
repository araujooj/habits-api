import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const id_column = {
  name: 'id',
  type: 'uuid',
  isPrimary: true,
} as const;

const created_at_column = {
  name: 'created_at',
  type: 'timestamp',
  default: 'now()',
} as const;

export default class CreateUsersTokens1619566768438 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_tokens',
        columns: [
          id_column,
          {
            name: 'refresh_token',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: id_column.type,
          },
          {
            name: 'expires_date',
            type: 'timestamp',
          },
          created_at_column,
        ],
        foreignKeys: [
          {
            name: 'fk_users_tokens_user_id',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_tokens');
  }
}
