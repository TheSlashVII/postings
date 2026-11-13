import { MigrationInterface, QueryRunner } from "typeorm";

export class CompanyNullableDescription1794588491044 implements MigrationInterface {
    name = 'CompanyNullableDescription1794588491044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`description\` \`description\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`company\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`);
    }

}
