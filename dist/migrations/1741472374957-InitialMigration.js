"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1741472374957 = void 0;
class InitialMigration1741472374957 {
    constructor() {
        this.name = 'InitialMigration1741472374957';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "admins" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "verificationCode" character varying, "otpExpiresAt" TIMESTAMP, CONSTRAINT "UQ_051db7d37d478a69a7432df1479" UNIQUE ("email"), CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "salary" numeric(10,2) NOT NULL, "tax" numeric(10,2), "pension" numeric(10,2), "nhis" numeric(10,2), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "payroll" ("id" SERIAL NOT NULL, "grossPay" numeric(10,2) NOT NULL, "tax" numeric(10,2) NOT NULL DEFAULT '0', "pension" numeric(10,2) NOT NULL DEFAULT '0', "nhis" numeric(10,2) NOT NULL DEFAULT '0', "netPay" numeric(10,2) NOT NULL, "payPeriod" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "employeeId" integer, CONSTRAINT "PK_7a76b819506029fc535b6e002e0" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "payroll" ADD CONSTRAINT "FK_53c4df41fa696a3b48d5c35db38" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "payroll" DROP CONSTRAINT "FK_53c4df41fa696a3b48d5c35db38"`);
            yield queryRunner.query(`DROP TABLE "payroll"`);
            yield queryRunner.query(`DROP TABLE "employee"`);
            yield queryRunner.query(`DROP TABLE "admins"`);
        });
    }
}
exports.InitialMigration1741472374957 = InitialMigration1741472374957;
