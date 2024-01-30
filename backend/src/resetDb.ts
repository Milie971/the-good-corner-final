import db from "./db";
import { Ad } from "./entities/ad";
import { Category } from "./entities/category";
import { Tag } from "./entities/tag";

async function clearDB() {
  const runner = db.createQueryRunner();
  await runner.query("PRAGMA foreign_keys=OFF");
  await Promise.all(
    db.entityMetadatas.map((entity) =>
      runner.query(`DROP TABLE IF EXISTES ${entity.tableName}`)
    )
  );
  await runner.query("PRAGMA foreign_keys=ON");
  await db.synchronize();
}

async function main() {
  await db.initialize();
  await clearDB();

  const ad1 = Ad.create({
    title: "IpadPro",
    description: "capacité 256GO",
    owner: "Victoria",
    price: 600,
    picture:
      "https://www.ecosia.org/images?addon=safari&addonversion=4.2.1.51&q=ipad%20pro#id=E511A995403262A4908DCE680DC837F16FE894C3",
    location: "Paris",
  });
  const ad2 = Ad.create({
    title: "Télé",
    description: "150cm",
    owner: "Harry",
    price: 400,
    picture:
      "https://www.ecosia.org/images?addon=safari&addonversion=4.2.1.51&q=ipad%20pro#id=E511A995403262A4908DCE680DC837F16FE894C3",
    location: "London",
  });

  const cat1 = Category.create({ name: "informatique" });
  const cat2 = Category.create({ name: "personnel" });

  const tag1 = Tag.create({ name: "tag1" });
  const tag2 = Tag.create({ name: "tag2" });
  const tag3 = Tag.create({ name: "tag3" });

  ad1.category = cat1;
  ad1.tags = [tag1, tag2];

  ad2.category = cat2;
  ad2.tags = [tag2, tag3];

  await ad1.save();
  await ad2.save();

  // await cat1.remove();
}

main();
