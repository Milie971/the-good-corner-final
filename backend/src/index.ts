//  .log("hello Sunshine");
import "reflect-metadata";
import express from "express";
import db from "./db";

import categoryRouter from "./routes/categories";
import tagRouter from "./routes/tags";
import adRouter from "./routes/ads";

const app = express();
const port = 3500;

/**
 ==================================================
                          ROUTES
 ================================================
 */

app.use(express.json());
app.use("/categories", categoryRouter);
app.use("tags", tagRouter);
app.use("ads", adRouter);

/**
 ==================================================
                      LANCEMENT PROJETS
 ================================================
 */
app.listen(port, async () => {
  await db.initialize();
  console.log(`Example app listening on port ${port}`);
});
