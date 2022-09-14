import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

import Teacher from "./teacher.entity";
import Student from "./student.entity";

@Entity("classes")
class Class {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  hour: string;

  @Column({ default: true })
  isOpen: boolean;

  @ManyToOne(() => Teacher, { eager: true, onDelete: "CASCADE" })
  teacher: Teacher;

  @ManyToMany(() => Student, { eager: true })
  @JoinTable()
  students: Student[];
}

export default Class;
