import { MigrationInterface, QueryRunner } from "typeorm";

export class IdCompanyDefaultValuePatch1793104466293 implements MigrationInterface {
    name = 'IdCompanyDefaultValuePatch1793104466293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_d407347be06b842c8fd1741928c\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id_company\` \`id_company\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_d407347be06b842c8fd1741928c\` FOREIGN KEY (\`id_company\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_d407347be06b842c8fd1741928c\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`id_company\` \`id_company\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_d407347be06b842c8fd1741928c\` FOREIGN KEY (\`id_company\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
