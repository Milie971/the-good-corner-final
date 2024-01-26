import db from "./db";
import { Ad } from "./entities/ad";
import { Category } from "./entities/category";

async function main() {
  await db.initialize();
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

  const cat1 = await Category.create({ name: "informatique" });
  ad1.category = cat1;
  ad2.category = cat1;
  await ad1.save();
  await ad2.save();

  // await cat1.remove();
}

main();
