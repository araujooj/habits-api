import {
  MigrationInterface, QueryRunner, TableColumn, TableForeignKey,
} from 'typeorm';

export default class CreatePerceptionStudentsRelation1616151742975 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'perceptions',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey('perceptions', new TableForeignKey({
      name: 'EducatorPerception',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }))

    await queryRunner.addColumn(
      'perceptions',
      new TableColumn({
        name: 'student_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey('perceptions', new TableForeignKey({
      name: 'StudentPerception',
      columnNames: ['student_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'students',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('perceptions', 'EducatorPerception');

    await queryRunner.dropColumn('perceptions', 'user_id');

    await queryRunner.dropForeignKey('perceptions', 'StudentPerception');

    await queryRunner.dropColumn('perceptions', 'student_id');
  }
}
