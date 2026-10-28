import { MigrationInterface, QueryRunner } from "typeorm";

export class IdCompanyDefaultValue1793104327169 implements MigrationInterface {
    name = 'IdCompanyDefaultValue1793104327169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_experience\` DROP FOREIGN KEY \`FK_f96683c6b398260d0b03ef725f7\``);
        await queryRunner.query(`ALTER TABLE \`job_experience\` DROP COLUMN \`id_user\``);
        await queryRunner.query(`ALTER TABLE \`job_experience\` ADD \`id_user\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_d407347be06b842c8fd1741928c\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id_company\` \`id_company\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`job_experience\` ADD CONSTRAINT \`FK_f96683c6b398260d0b03ef725f7\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_d407347be06b842c8fd1741928c\` FOREIGN KEY (\`id_company\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_d407347be06b842c8fd1741928c\``);
        await queryRunner.query(`ALTER TABLE \`job_experience\` DROP FOREIGN KEY \`FK_f96683c6b398260d0b03ef725f7\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id_company\` \`id_company\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_d407347be06b842c8fd1741928c\` FOREIGN KEY (\`id_company\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`job_experience\` DROP COLUMN \`id_user\``);
        await queryRunner.query(`ALTER TABLE \`job_experience\` ADD \`id_user\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`job_experience\` ADD CONSTRAINT \`FK_f96683c6b398260d0b03ef725f7\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
