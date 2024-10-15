import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  companyRegistrationNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'int' })
  status: number;

  @Column({ type: 'boolean', default: false })
  deleted: boolean;

  @Column({ type: 'int', default: 0 })
  default: number;
}
