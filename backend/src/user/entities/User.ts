import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100 })
  name: string;
  @Column({ type: 'varchar', length: 200 })
  email: string;
  @Column({ type: 'varchar', length: 255 })
  password: string;
  @Column({ type: 'varchar', default: 'CLIENTE' })
  role: string;
  @Column({ default: true })
  active: boolean;
  @CreateDateColumn()
  createdAt?: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
