"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// console.log("hello Sunshine");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
//import sqlite from "sqlite3";
const db_1 = __importDefault(require("./db"));
//import { DataSource } from "typeorm";
//const db = new sqlite.Database("the_good_corner.sqlite");
const app = (0, express_1.default)();
const port = 3500;
let ads = [
    {
        id: 1,
        title: "Bike to sell",
        description: "My bike is blue, working fine. I'm selling it because I've got a new one",
        owner: "bike.seller@gmail.com",
        price: 100,
        picture: "https://images.lecho.be/view?iid=dc:113129565&context=ONLINE&ratio=16/9&width=640&u=1508242455000",
        location: "Paris",
        createdAt: "2023-09-05T10:13:14.755Z",
    },
    {
        id: 2,
        title: "Car to sell",
        description: "My car is blue, working fine. I'm selling it because I've got a new one",
        owner: "car.seller@gmail.com",
        price: 10000,
        picture: "https://www.automobile-magazine.fr/asset/cms/34973/config/28294/apres-plusieurs-prototypes-la-bollore-bluecar-a-fini-par-devoiler-sa-version-definitive.jpg",
        location: "Paris",
        createdAt: "2023-10-05T10:14:15.922Z",
    },
];
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello sunshine!");
});
app.get("/ad", (req, res) => {
    /*
    res.send(ads);
    db.all("SELECT * FROM ad", (err, rows) => {
      if (!err) res.send(rows);
      else {
        console.log(err);
        res.sendStatus(500);
      }
    });
    */
});
app.post("/ad", (req, res) => {
    const id = ads.length + 1;
    const newAd = Object.assign(Object.assign({}, req.body), { id, createdAt: new Date().toISOString() });
    console.log(newAd);
    ads.push(req.body);
    res.send("Request received, check the backend terminal");
    /*
    db.run(
      "INSERT INTO ad (title, description, owner, price, picture, location, createdAt, category_id) VALUES($title, $description, $owner, $price, $picture, $location, $createdAt, $category_id)",
      {
        $title: req.body.title,
        $description: req.body.description, // placeholder
        $owner: req.body.owner,
        $price: req.body.price,
        $picture: req.body.picture,
        $location: req.body.location,
        $createdAt: req.body.createdAt,
        $category_id: req.body.category_id,
      },
      function (this:any, err:any){
        if (!err)
        return res.send({
      ...newAd,
    id: this.lastID,
  });
  console.log(err);
  res.sendStatus(500)
      }
    );
    */
});
app.delete("/ad/:id", (req, res) => {
    /*
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
  
  
  ou
  db.GET("SELECT * FROM ad WHERE id = ?", [req.params.id], (err, row) =>{
   
  if (err){
    console.log(err);
    return res.sendStatus(500);
  }
  if (!row) return res.sendStatus(404);
  db.run("DELETE FROM ad WHERE id= ?", [req.params.id], (err: any)=>{
    if (!err) return res.sendStatus(204);
    console.log(err);
    res.sendStatus(500);
  });
  });
  */
});
app.patch("/ad/:id", (req, res) => {
    /*
    const idAdToUpdate = parseInt(req.params.id, 10);
    if (!ads.find((ad) => ad.id === idAdToUpdate)) return res.sendStatus(404);
  
    //imperative way
  
    const indexOfAdToUpdate = ads.findIndex((ad) => ad.id === idAdToUpdate);
  
    ads[indexOfAdToUpdate] = {
      ...ads[indexOfAdToUpdate],
      ...req.body,
    };
  
    OR
  db.get("SELECT * FROM ad WHERE id = ?", [req.params.id], (err:row)=> {
    if (err){
      console.log(err);
      return res.sendStatus(500);
    }
  if (!row) return res.sendStatus(404);
  
  //create an object with this shape : {$tittle: "$title sent by client", "$description:" description sent by client", ...}
  const  propsToUpdate = Object.keys(req.body).reduce(
    (acc, prop)=> ({...acc, [`$${prop}`]: req.body[prop]}),
    {}
  );
  db.run(
    ` UPDATE ad SET ${setProps} WHERE id= $id`,
    {...propsToUpdate, $id: req.params.id},
    (err: any) =>{
      if (!err) return res.send({...row, ...req.body });
      console.log(err);
      res.sendStatus(500)
    }
  );
  });
   
   
  });
  
  
    // declarative way
    ads = ads.map((ad) => {
      if (ad.id === indexOfAdToUpdate) return { ...ad, ...req.body };
      else return ad;
    });
    res.send(ads[indexOfAdToUpdate]);
     */
});
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.initialize();
    console.log(`Example app listening on port ${port}`);
}));
