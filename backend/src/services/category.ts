import { Category } from "../entities/category";

export default class CategoryService {
  static async list() {
    const categories = await Category.find({
      relations: {
        ads: true,
      },
    });
    return categories;
  }

  create() {}

  find() {}
}
