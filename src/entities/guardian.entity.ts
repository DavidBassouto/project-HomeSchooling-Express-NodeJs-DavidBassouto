import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("guardians")
class Guardian {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  cellNumber: string;
}

export default Guardian;
