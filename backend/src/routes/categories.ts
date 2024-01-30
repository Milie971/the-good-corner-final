import { Router, Response } from "express";
import { Category } from "../entities/category";

const router = Router();
router.get("/categories", async (_, res: Response) => {
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

export default router;

/**
 ==================================================
 Liste de routes 
 ================================================
 */

router.get("/find/:id", async (_, res: Response) => {});
