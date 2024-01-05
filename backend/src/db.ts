import { DataSource } from "typeorm";
import { Ad } from "./entities/ad";

export default new DataSource({
  type: "sqlite",
  database: "the_good_corner.sqlite",
  entities: ["./entities/*.ts"],
  synchronize: true,
  logging: true,
});
