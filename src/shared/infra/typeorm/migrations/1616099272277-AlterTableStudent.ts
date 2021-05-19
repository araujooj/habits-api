import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterTableStudent1616099272277 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('students', 'class')

    await queryRunner.addColumn('students', new TableColumn({
      name: 'course',
      type: 'varchar',
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('students', 'course')

    await queryRunner.addColumn('students', new TableColumn({
      name: 'class',
      type: 'varchar',
    }))
  }
}
