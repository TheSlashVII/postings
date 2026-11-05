import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCorrection1793014539213 implements MigrationInterface {
    name = 'UserCorrection1793014539213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(150) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`surmame\` \`surmame\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`date_of_birth\` \`date_of_birth\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`city_of_residence\` \`city_of_residence\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone\` \`phone\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`phone\` \`phone\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`city_of_residence\` \`city_of_residence\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`date_of_birth\` \`date_of_birth\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`surmame\` \`surmame\` varchar(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`name\` \`name\` varchar(150) NOT NULL`);
    }

}
