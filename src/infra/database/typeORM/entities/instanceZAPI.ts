import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class InstanceZAPI {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  phoneNumberId: string;

  @Column({ type: 'varchar' })
  token: string;

  @Column({ type: 'varchar', nullable: true })
  code: string;

  @Column({ type: 'int' })
  type: number;

  @Column({ type: 'int' })
  status: number;

  @Column({ type: 'varchar' })
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;
}
