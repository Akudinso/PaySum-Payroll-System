import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Employee } from "./employee";

@Entity()
export class Payroll {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Employee, (employee) => employee.payrolls, { onDelete: "CASCADE" })
    employee: Employee;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    grossPay: number;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    tax: number;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    pension: number;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    nhis: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    netPay: number;

    @Column()
    payPeriod: string; // Format: "YYYY-MM"

    @CreateDateColumn()
    createdAt: Date;
}
