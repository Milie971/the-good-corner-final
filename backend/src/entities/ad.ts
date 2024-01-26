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
}
