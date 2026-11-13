import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyNameColumnAmmend1794494427612 implements MigrationInterface {
    name = 'CompanyNameColumnAmmend1794494427612'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` ADD \`name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` DROP COLUMN \`name\``);
    }

}
