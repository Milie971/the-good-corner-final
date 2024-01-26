import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from "typeorm";
import { Length, Min } from "class-validator";
@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @Length(5, 50, { message: "Le titre doit contenir entre 5 et 50 caractères" })
  title: string;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column()
  owner: string;

  @Column({ type: "float" })
  @Min(0, { message: "Le prix doit être positif" })
  price: number;

  @Column()
  picture: string;

  @Column()
  location: string;

  @CreateDateColumn()
  createdAt: string;

  constructor({
    id,
    title,
    description,
    owner,
    price,
    picture,
    location,
    createdAt,
  }: {
    id: number;
    title: string;
    description: string;
    owner: string;
    price: number;
    picture: string;
    location: string;
    createdAt: string;
  }) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.owner = owner;
    this.price = price;
    this.picture = picture;
    this.location = location;
    this.createdAt = createdAt;
  }
  // static createAd(adData: Partial<Ad>): Ad {
  //   const ad = new Ad();
  //   Object.assign(ad, adData);
  //   return ad;
  // }
}
