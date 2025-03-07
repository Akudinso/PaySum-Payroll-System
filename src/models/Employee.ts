import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}