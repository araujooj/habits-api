import Event from '@modules/events/infra/typeorm/entities/Event';
import Group from '@modules/groups/infra/typeorm/entities/Group';
import User from '@modules/users/infra/typeorm/entities/User';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Notification from './Notification';

@Entity('notifications_users')
class NotificationUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Notification, (notification) => notification.notifications_users)
  @JoinColumn({ name: 'notification_id' })
  notification: Notification;

  @Exclude()
  @ManyToOne(() => User, (user) => user.notifications, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default NotificationUser;
