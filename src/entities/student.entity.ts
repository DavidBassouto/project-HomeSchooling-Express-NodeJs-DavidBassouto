import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";

import Guardian from "./guardian.entity";

@Entity("students")
class Student {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "integer", nullable: true })
  age: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Guardian, { onDelete: "CASCADE" })
  guardian: Guardian;
}

export default Student;
