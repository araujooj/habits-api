import Group from '@modules/groups/infra/typeorm/entities/Group';
import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';

@Entity('users_groups')
class UserGroup {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @Exclude()
  @ManyToOne(() => User, (user) => user.user_groups, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'id' })
  getUserId() {
    return this.user.id;
  }

  @Expose({ name: 'name' })
  getName() {
    return this.user.name;
  }

  @Expose({ name: 'email' })
  getEmail() {
    return this.user.email;
  }
}
export default UserGroup;
