"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
exports.default = new typeorm_1.DataSource({
    type: "sqlite",
    database: "the_good_corner.sqlite",
    entities: ["./entities/*.ts"],
    synchronize: true,
    logging: true,
});
