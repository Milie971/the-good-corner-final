import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
} from "typeorm";

@Entity()
export class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column()
  owner: string;

  @Column({ type: "float" })
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
}
