import { DataSource } from "typeorm";
import { defaultDbConfig } from "../app.module.js"
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// this are the utilities that the ORM will use to get the data from the database
export const AppDataSource = new DataSource({
  type: "mysql",
  host: defaultDbConfig.host,
  port: defaultDbConfig.port,
  username: defaultDbConfig.username,
  password: defaultDbConfig.password,
  database: defaultDbConfig.database,
  entities: [__dirname + "/entities/**/*{.js,.ts}"],
  migrations: [__dirname + "/migrations/*{.js,.ts}"]
})
/*
try {
  await AppDataSource.initialize()
  console.log("Data Source has been initialized!")
} catch (error) {
  console.error("Error during Data Source initialization", error)
}*/
