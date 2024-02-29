import { Router, Request, Response } from "express";
import { Tag } from "../entities/tag";
import { Like } from "typeorm";
import { validate } from "class-validator";

const router = Router();

router.get("/list", async (req: Request, res: Response) => {
  console.log("Je suis dans les tags");
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

router.post("/create", async (req: Request, res: Response) => {
  try {
    const newTag = Tag.create(req.body);
    const errors = await validate(newTag);
    console.log({ errors });

    if (errors.length !== 0) return res.status(422).send({ errors });
    res.send(await newTag.save());
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
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
export default router;
