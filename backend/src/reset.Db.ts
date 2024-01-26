import db from "./db";
import { Ad } from "./entities/ad";

async function main() {
  await db.initialize();
  await Ad.create({
    title: "IpadPro",
    description: "capacité 256GO",
    owner: "Victoria",
    price: 600,
    picture:
      "https://www.ecosia.org/images?addon=safari&addonversion=4.2.1.51&q=ipad%20pro#id=E511A995403262A4908DCE680DC837F16FE894C3",
    location: "Paris",
  }).save();
}

main();
