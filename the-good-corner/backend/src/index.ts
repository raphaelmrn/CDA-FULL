import "reflect-metadata";
import { dataSource } from "./config/db";

const port = 3000;

await dataSource.initialize();
