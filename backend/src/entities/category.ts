import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Ad } from "./entities/ad";
@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];

  @CreateDateColumn()
  createAt: string;

  @ManyToOne(() => Category, (c) => c.ads)
  category: Category;
}
