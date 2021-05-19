import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export default class CreateStudentsAndUsersRelation1616097842767 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'students',
      new TableColumn({
        name: 'coach_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey('students', new TableForeignKey({
      name: 'StudentCoach',
      columnNames: ['coach_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }))

    await queryRunner.addColumn(
      'students',
      new TableColumn({
        name: 'facilitator_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey('students', new TableForeignKey({
      name: 'StudentFacilitator',
      columnNames: ['facilitator_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('students', 'StudentCoach');

    await queryRunner.dropColumn('students', 'coach_id');

    await queryRunner.dropForeignKey('students', 'StudentFacilitator');

    await queryRunner.dropColumn('students', 'facilitator_id');
  }
}
