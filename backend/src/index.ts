// console.log("hello Sunshine");
import express, { Request, Response } from "express";
import { Ad } from "./type";
import sqlite from "sqlite3";

const db = new sqlite.Database("the_good_corner.sqlite");
const app = express();
const port = 3500;

let ads: Ad[] = [
  {
    id: 1,
    title: "Bike to sell",
    description:
      "My bike is blue, working fine. I'm selling it because I've got a new one",
    owner: "bike.seller@gmail.com",
    price: 100,
    picture:
      "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
    location: "Paris",
    createdAt: "2023-09-05T10:13:14.755Z",
  },
  {
    id: 2,
    title: "Car to sell",
    description:
      "My car is blue, working fine. I'm selling it because I've got a new one",
    owner: "car.seller@gmail.com",
    price: 10000,
    picture:
      "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
    location: "Paris",
    createdAt: "2023-10-05T10:14:15.922Z",
  },
];
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello sunshine!");
});

// app.get("/ad", (req: Request, res: Response) => {
//   db.all("SELECT * FROM ad", (err, rows) => {
//     if (!err) {
//       res.send(rows);
//     } else {
//       console.error(err);
//       res.sendStatus(500);
//     }
//   });
// });

app.get("/ad", (req: Request, res: Response) => {
  res.send(ads);
  db.all("SELECT * FROM ad ", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
      res.sendStatus(500);
    }
  });
});

app.post("/ad", (req: Request, res: Response) => {
  const id = ads.length + 1;

  const newAd = { ...req.body, id, createdAt: new Date().toISOString() };
  console.log(newAd);
  ads.push(req.body);
  res.send("Request received, check the backend terminal");

  db.run(
    "INSERT INTO ad (title, description, owner, price, picture, location) VALUES($title, $description, $owner, $price, $picture, $location)",
    {
      $title: req.body.title,
      $description: req.body.description, // placehorlder
      $owner: req.body.owner,
      $price: req.body.price,
      $picture: req.body.picture,
      $location: req.body.location,
    }
  );
});

app.delete("/ad/:id", (req, res) => {
  const idAdToDelete = parseInt(req.params.id, 10);
  if (!ads.find((ad) => ad.id === idAdToDelete)) return res.sendStatus(404);
  // declarative way
  ads = ads.filter((ad) => ad.id !== idAdToDelete);

  //imperative way
  ads.splice(
    ads.findIndex((ad) => ad.id === idAdToDelete),
    1
  );
  res.sendStatus(204).send({ message: "ad deleted !" });
});

app.patch("/ad/:id", (req, res) => {
  const idAdToUpdate = parseInt(req.params.id, 10);
  if (!ads.find((ad) => ad.id === idAdToUpdate)) return res.sendStatus(404);

  //imperative way

  const indexOfAdToUpdate = ads.findIndex((ad) => ad.id === idAdToUpdate);
  /*
  ads[indexOfAdToUpdate] = {
    ...ads[indexOfAdToUpdate],
    ...req.body,
  };*/

  // declarative way
  ads = ads.map((ad) => {
    if (ad.id === indexOfAdToUpdate) return { ...ad, ...req.body };
    else return ad;
  });
  res.send(ads[indexOfAdToUpdate]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
