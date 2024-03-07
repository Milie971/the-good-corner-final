import { Router, Request, Response } from "express";
import { Tag } from "../entities/tag";
import { Like } from "typeorm";
import { validate } from "class-validator";
import TagService from "../services/tags.service";
import { ICreateTag, IListTag } from "../types/tag";

const router = Router();

router.get("/list", async (req: Request, res: Response) => {
  console.log("I am in the tags");
  try {
    const { name } = req.query as unknown as IListTag;
    const tags = await new TagService().list(name);
    res.send(tags);
    // res.send(await Ad.find());
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/create", async (req: Request, res: Response) => {
  try {
    const data: ICreateTag = req.body;
    const newTag = new TagService().create({ ...data });

    res.send(newTag);
  } catch (err: any) {
    console.log(err);
    res.sendStatus(500).json({ message: err.message });
  }
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const tagToDelete = await new TagService().delete(+req.params.id);
    res.sendStatus(204).json(tagToDelete);
  } catch (err: any) {
    console.log(err);
    res.sendStatus(500).json({ message: err.message });
  }
});
export default router;
