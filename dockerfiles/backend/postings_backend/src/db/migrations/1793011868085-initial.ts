import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1793011868085 implements MigrationInterface {
    name = 'Initial1793011868085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`sector\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job_experience\` (\`id\` varchar(36) NOT NULL, \`position\` varchar(250) NOT NULL, \`company_name\` varchar(255) NOT NULL, \`start_date\` datetime NULL, \`end_date\` datetime NULL, \`description\` varchar(400) NOT NULL, \`id_user\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company\` (\`id\` varchar(36) NOT NULL, \`url_formatted_name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(150) NOT NULL, \`surmame\` varchar(200) NOT NULL, \`date_of_birth\` date NOT NULL, \`city_of_residence\` varchar(200) NOT NULL, \`email\` varchar(150) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`id_company\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job_post\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`experience_required\` int NOT NULL, \`description\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`application_status\` (\`id_user\` varchar(255) NOT NULL, \`id_post\` varchar(255) NOT NULL, \`applied\` tinyint NOT NULL, \`status\` enum ('applied', 'rejected', 'in_process') NOT NULL DEFAULT 'applied', \`applied_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id_user\`, \`id_post\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`company_sector\` (\`id_company\` varchar(36) NOT NULL, \`id_sector\` int NOT NULL, INDEX \`IDX_40c11b8b1f11b6db45f4e7d922\` (\`id_company\`), INDEX \`IDX_00cb508149f2ea356be347e630\` (\`id_sector\`), PRIMARY KEY (\`id_company\`, \`id_sector\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`job_sector\` (\`id_sector\` varchar(36) NOT NULL, \`id_job\` int NOT NULL, INDEX \`IDX_d9d75e6907bed9d958644ff99f\` (\`id_sector\`), INDEX \`IDX_09f8ffb7bdd6b622b698af03df\` (\`id_job\`), PRIMARY KEY (\`id_sector\`, \`id_job\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`job_experience\` ADD CONSTRAINT \`FK_f96683c6b398260d0b03ef725f7\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_d407347be06b842c8fd1741928c\` FOREIGN KEY (\`id_company\`) REFERENCES \`company\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application_status\` ADD CONSTRAINT \`FK_e8579e45f72d4abe23bee913892\` FOREIGN KEY (\`id_user\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`application_status\` ADD CONSTRAINT \`FK_ae1954917924b34c5bbe1e94afd\` FOREIGN KEY (\`id_post\`) REFERENCES \`job_post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`company_sector\` ADD CONSTRAINT \`FK_40c11b8b1f11b6db45f4e7d9221\` FOREIGN KEY (\`id_company\`) REFERENCES \`company\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`company_sector\` ADD CONSTRAINT \`FK_00cb508149f2ea356be347e630a\` FOREIGN KEY (\`id_sector\`) REFERENCES \`sector\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`job_sector\` ADD CONSTRAINT \`FK_d9d75e6907bed9d958644ff99f2\` FOREIGN KEY (\`id_sector\`) REFERENCES \`job_post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`job_sector\` ADD CONSTRAINT \`FK_09f8ffb7bdd6b622b698af03df0\` FOREIGN KEY (\`id_job\`) REFERENCES \`sector\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`job_sector\` DROP FOREIGN KEY \`FK_09f8ffb7bdd6b622b698af03df0\``);
        await queryRunner.query(`ALTER TABLE \`job_sector\` DROP FOREIGN KEY \`FK_d9d75e6907bed9d958644ff99f2\``);
        await queryRunner.query(`ALTER TABLE \`company_sector\` DROP FOREIGN KEY \`FK_00cb508149f2ea356be347e630a\``);
        await queryRunner.query(`ALTER TABLE \`company_sector\` DROP FOREIGN KEY \`FK_40c11b8b1f11b6db45f4e7d9221\``);
        await queryRunner.query(`ALTER TABLE \`application_status\` DROP FOREIGN KEY \`FK_ae1954917924b34c5bbe1e94afd\``);
        await queryRunner.query(`ALTER TABLE \`application_status\` DROP FOREIGN KEY \`FK_e8579e45f72d4abe23bee913892\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_d407347be06b842c8fd1741928c\``);
        await queryRunner.query(`ALTER TABLE \`job_experience\` DROP FOREIGN KEY \`FK_f96683c6b398260d0b03ef725f7\``);
        await queryRunner.query(`DROP INDEX \`IDX_09f8ffb7bdd6b622b698af03df\` ON \`job_sector\``);
        await queryRunner.query(`DROP INDEX \`IDX_d9d75e6907bed9d958644ff99f\` ON \`job_sector\``);
        await queryRunner.query(`DROP TABLE \`job_sector\``);
        await queryRunner.query(`DROP INDEX \`IDX_00cb508149f2ea356be347e630\` ON \`company_sector\``);
        await queryRunner.query(`DROP INDEX \`IDX_40c11b8b1f11b6db45f4e7d922\` ON \`company_sector\``);
        await queryRunner.query(`DROP TABLE \`company_sector\``);
        await queryRunner.query(`DROP TABLE \`application_status\``);
        await queryRunner.query(`DROP TABLE \`job_post\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`company\``);
        await queryRunner.query(`DROP TABLE \`job_experience\``);
        await queryRunner.query(`DROP TABLE \`sector\``);
    }

}
