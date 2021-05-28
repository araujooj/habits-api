import Group from '@modules/groups/infra/typeorm/entities/Group';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('events')
class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column()
  location: string;

  @ManyToOne(() => Group, (group) => group.events)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Event;
