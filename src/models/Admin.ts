import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("admins")
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ type: "varchar", nullable: true })
  verificationCode: string;

  @Column({ type: "timestamp", nullable: true })
  otpExpiresAt: Date;
}
