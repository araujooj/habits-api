import User from '@modules/users/infra/typeorm/entities/User';
import UserGroup from '@modules/users/infra/typeorm/entities/UserGroup';
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

  @OneToMany(() => UserGroup, (userGroup) => userGroup.group, { cascade: true })
  user_groups: UserGroup[];

  @ManyToOne(() => User, (user) => user.created_groups)
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default Group;
