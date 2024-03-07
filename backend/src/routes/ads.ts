import { Router, Request, Response } from "express";
import { Ad } from "../entities/ad";
import { In } from "typeorm";
import { validate } from "class-validator";
import AdsService from "../services/ads.service";
import CategoryService from "../services/category.service";
const router = Router();

router.get("/list", async (req: Request, res: Response) => {
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
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/listbycategory/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await new CategoryService().find(+id);

  if (!category) {
    throw new Error("La categorie n'existe pas");
  }
  try {
    const ads = await new AdsService().listByCategory(+id);
    res.send(ads);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/create", async (req: Request, res: Response) => {
  try {
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

router.patch("/update/:id", async (req, res) => {
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

router.delete("/delete/:id", async (req, res) => {
  try {
    const adToDelete = await Ad.findOneBy({
      id: parseInt(req.params.id, 10),
    });
    if (!adToDelete) return res.sendStatus(440);
    await adToDelete.remove();
    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default router;
