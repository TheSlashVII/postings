import { MigrationInterface, QueryRunner } from "typeorm";

export class JobPostStatus1793643068790 implements MigrationInterface {
    name = 'JobPostStatus1793643068790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_post\` ADD \`post_status\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_post\` DROP COLUMN \`post_status\``);
    }

}
