import { Column, Entity, PrimaryColumn } from "typeorm";
import { Exclude } from "class-transformer";

@Entity("guardians")
class Guardian {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: true })
  cellNumber: string;
}

export default Guardian;
