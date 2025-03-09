import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Payroll } from "./payroll";

@Entity("")
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column("decimal", { precision: 10, scale: 2 })
  salary: number;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  tax: number;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  pension: number;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  nhis: number;

  @OneToMany(() => Payroll, (payroll) => payroll.employee)
    payrolls: Payroll[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
