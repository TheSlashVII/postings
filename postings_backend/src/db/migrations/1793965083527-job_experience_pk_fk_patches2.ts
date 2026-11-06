import { MigrationInterface, QueryRunner } from "typeorm";

export class JobExperiencePkFkPatches21793965083527 implements MigrationInterface {
    name = 'JobExperiencePkFkPatches21793965083527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`country\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`job_experience\` DROP COLUMN \`start_date\``);
        await queryRunner.query(`ALTER TABLE \`job_experience\` ADD \`start_date\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`job_experience\` DROP COLUMN \`end_date\``);
        await queryRunner.query(`ALTER TABLE \`job_experience\` ADD \`end_date\` date NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_experience\` DROP COLUMN \`end_date\``);
        await queryRunner.query(`ALTER TABLE \`job_experience\` ADD \`end_date\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`job_experience\` DROP COLUMN \`start_date\``);
        await queryRunner.query(`ALTER TABLE \`job_experience\` ADD \`start_date\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`country\``);
    }

}
