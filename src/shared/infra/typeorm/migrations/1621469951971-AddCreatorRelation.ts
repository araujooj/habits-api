import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export default class AddCreatorRelation1621469951971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'groups',
      new TableColumn({
        name: 'creator_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'groups',
      new TableForeignKey({
        name: 'CREATOR_FK',
        columnNames: ['creator_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('groups', 'CREATOR_FK');
    await queryRunner.dropColumn('groups', 'creator_id');
  }
}
