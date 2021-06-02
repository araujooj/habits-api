import User from '@modules/users/infra/typeorm/entities/User';
import UserGroup from '@modules/users/infra/typeorm/entities/UserGroup';
import Event from '@modules/events/infra/typeorm/entities/Event';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('groups')
class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @ManyToOne(() => User, (user) => user.created_groups, { eager: true })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.group, { cascade: true, eager: true })
  users_on_group: UserGroup[];

  @OneToMany(() => Event, (event) => event.group, { cascade: true, eager: true })
  events: Event[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Group;
