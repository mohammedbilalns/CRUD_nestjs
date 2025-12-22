import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';


@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ){}



  async findAll(): Promise<Post[]>{
    return this.postRepository.find()

  }

  async findOne(postId: number) : Promise<Post> {
    const post = await this.postRepository.findOneBy({id: postId})
    if(!post) throw new NotFoundException(`Post with ID ${postId} not found  `)
    return post 
  }

  async create(createPostData : CreatePostDto) :  Promise<Post> {
    const newPost : Post = this.postRepository.create({
      title: createPostData.title,
      content: createPostData.content,
      authorName: createPostData.authorName,
    }) 


    return await this.postRepository.save(newPost)
  }

  async update(id: number , updatePostData: UpdatePostDto): Promise<Post> {

    const existingPost = await this.postRepository.findOne({where: {id}})

    if(!existingPost) throw new NotFoundException(`Post with id ${id} is not found`)

    if(updatePostData.title){
      existingPost.title = updatePostData.title
    }

    if(updatePostData.content){
      existingPost.content = updatePostData.content
    }

    if(updatePostData.authorName){
      existingPost.authorName = updatePostData.authorName
    }

    return this.postRepository.save(existingPost)

  }

  async remove(id: number) : Promise<void> {
    const existingPost = await this.postRepository.findOneBy({id})

    if(!existingPost) throw new NotFoundException(`Post with id ${id} is not found `)

    await this.postRepository.remove(existingPost)

  }

}