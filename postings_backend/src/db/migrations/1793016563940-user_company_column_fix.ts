import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCompanyColumnFix1793016563940 implements MigrationInterface {
    name = 'UserCompanyColumnFix1793016563940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_d407347be06b842c8fd1741928c\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id_company\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`id_company\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_d407347be06b842c8fd1741928c\` FOREIGN KEY (\`id_company\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_d407347be06b842c8fd1741928c\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`id_company\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`id_company\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_d407347be06b842c8fd1741928c\` FOREIGN KEY (\`id_company\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
