// console.log("hello Sunshine");
import "reflect-metadata";
import { validate } from "class-validator";
import express, { Request, Response } from "express";

//import sqlite from "sqlite3";
import db from "./db";

import { Ad } from "./entities/ad";

//import { DataSource } from "typeorm";

//const db = new sqlite.Database("the_good_corner.sqlite");
const app = express();
const port = 3500;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello sunshine!");
});

app.get("/ad", async (req: Request, res: Response) => {
  try {
    const ads = await Ad.find();
    res.send(ads);
    // res.send(await Ad.find());
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post("/ad", async (req: Request, res: Response) => {
  try {
    //await Ad.insert(req.body)
    /*
    const newAd = new Ad()
    newAd.title =r eq.body.title;
    newAd.price = req.body.price;
    ...
    await newAd.save();
    */
    const newAd = Ad.create(req.body);

    const errors = await validate(newAd);
    console.log({ errors });

    if (errors) return res.status(422).send({ errors });
    const newAdWithId = await newAd.save();
    res.send(newAdWithId);
    // res.send(await Ad.find());
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.delete("/ad/:id", async (req, res) => {
  try {
    const adToDelete = await Ad.findOneBy({ id: parseInt(req.params.id, 10) });
    if (!adToDelete) return res.sendStatus(440);
    await adToDelete.remove();
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.patch("/ad/:id", async (req, res) => {
  try {
    const adToUpdate = await Ad.findOneBy({ id: parseInt(req.params.id, 10) });
    if (!adToUpdate) return res.sendStatus(440);
    await Ad.update(parseInt(req.params.id, 10), req.body);
    await Ad.merge(adToUpdate, req.body);
    res.send(await adToUpdate.save());
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(port, async () => {
  await db.initialize();
  console.log(`Example app listening on port ${port}`);
});
