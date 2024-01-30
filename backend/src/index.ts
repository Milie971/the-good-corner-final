// console.log("hello Sunshine");
import "reflect-metadata";
import { validate } from "class-validator";
import express, { Request, Response } from "express";
//import sqlite from "sqlite3";
import db from "./db";
import { Ad } from "./entities/ad";
import { Category } from "./entities/category";
import { Tag } from "./entities/tag";
import { In, Like } from "typeorm";
import categoryRouter from "./routes/categories";
//import { DataSource } from "typeorm";

//const db = new sqlite.Database("the_good_corner.sqlite");
const app = express();
const port = 3500;

app.use(express.json());
app.use("/categories", categoryRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello sunshine!");
});

app.get("/tags", async (req: Request, res: Response) => {
  try {
    const { name } = req.query;
    const tags = await Tag.find({
      where: { name: name ? Like(`%${name}%`) : undefined },
    });
    res.send(tags);
    // res.send(await Ad.find());
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
/*
app.get("/categories", async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({
      relations: {
        ads: true,
      },
    });
    res.send(categories);
    // res.send(await Ad.find());
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
*/
app.get("/ad", async (req: Request, res: Response) => {
  const { tagIds } = req.query;
  try {
    const ad = await Ad.find({
      relations: {
        category: true,
        tags: true,
      },
      where: {
        tags: {
          id:
            typeof tagIds === "string" && tagIds.length > 0
              ? In(tagIds.split(",").map((t) => parseInt(t, 10)))
              : undefined,
        },
      },
    });
    res.send(ad);
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

    if (errors.length !== 0) return res.status(422).send({ errors });
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
    const tagToDelete = await Tag.findOneBy({
      id: parseInt(req.params.id, 10),
    });
    if (!tagToDelete) return res.sendStatus(440);
    await tagToDelete.remove();
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

    await Ad.merge(adToUpdate, req.body);
    const errors = await validate(adToUpdate);
    if (errors.length !== 0) return res.status(422).send({ errors });
    /*
    const { tagIds } = req.body;
    if (Array.isArray(tagIds)) {
      const tagsToAssociate = await Tag.find({ where : { id :In(tagIds)}});
      adToUpdate.tags =tagsToAssociate
    } */
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
