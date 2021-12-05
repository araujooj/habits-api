import Event from '@modules/events/infra/typeorm/entities/Event';
import Group from '@modules/groups/infra/typeorm/entities/Group';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import NotificationUser from './NotificationUser';

@Entity('notifications')
class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column()
  type: string;

  @ManyToOne(() => Event)
  event: Event;

  @OneToMany(() => NotificationUser, (notificationUser) => notificationUser.notification)
  notifications_users: NotificationUser;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notification;
