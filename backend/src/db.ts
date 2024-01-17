import { DataSource } from "typeorm";
import { Ad } from "./entities/ad";

export default new DataSource({
  type: "sqlite",
  host:"localhost",
  port:3500,
  database: "the_good_corner.sqlite",
  entities: ["./src/entities/*.ts"],
  synchronize: true,
  logging: true,
});
