import { Router, Request, Response } from "express";
import { Category } from "../entities/category";
import CategoryService from "../services/category";

const router = Router();
router.get("/list", async (_, res: Response) => {
  try {
    // const categories = await Category.find({
    //   relations: {
    //     ads: true,
    //   },
    // });
    const categories = await CategoryService.list();
    res.send(categories);
    // res.send(await Ad.find());
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/find/:id", async (_, res: Response) => {});

export default router;

/**
 ==================================================
 Liste de routes 
 ================================================
 */
