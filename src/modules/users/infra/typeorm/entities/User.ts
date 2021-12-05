import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Group from '@modules/groups/infra/typeorm/entities/Group';
import NotificationUser from '@modules/notifications/infra/typeorm/entities/NotificationUser';
import UserGroup from './UserGroup';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => UserGroup, (userGroup) => userGroup.group, { cascade: true })
  user_groups: UserGroup;

  @OneToMany(() => Group, (group) => group.creator)
  created_groups: Group[];

  @OneToMany(() => NotificationUser, (notificationUser) => notificationUser.user)
  notifications: NotificationUser[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default User;
