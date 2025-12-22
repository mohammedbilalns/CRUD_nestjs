import { Post } from "src/posts/entities/post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

@Entity()
export class User{

  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true})
  email: string


  @Column()
  name: string

  @Column()
  password: string  //TODO: hash the passoword

  @Column({
  type: 'enum',
  enum: UserRole,
  default: UserRole.USER
  })
  role: UserRole


  @OneToMany(() => Post, (post) => post.authorName)
  posts: Post[]


  @CreateDateColumn()
  createdAt: Date


  @CreateDateColumn()
  updatedAt: Date

}
