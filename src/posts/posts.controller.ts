import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards, } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostExistsPipe } from './pipes/post-exist.pipe';
import { Post as PostEntity } from './entities/post.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/auth/entities/user.entity';

@Controller('posts')
export class PostsController {

  constructor(private readonly postService : PostsService){}

  @Get()
  async findAll(): Promise<PostEntity[]>{
    return this.postService.findAll()
  }
  

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe, PostExistsPipe) id: number): Promise<PostEntity>{
    return  this.postService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)// success http code 
  // @UsePipes(
  //   new ValidationPipe({})
  // ) // we can mount the pipes for the individual routes 
  async createPost(@Body() createPostData: CreatePostDto, @CurrentUser()  user:any): Promise<PostEntity>{
    return this.postService.create(createPostData, user)
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id', ParseIntPipe, PostExistsPipe) id :  number, @Body() updatePostData : UpdatePostDto,@CurrentUser() user: User): Promise<PostEntity>{
    return this.postService.update(id, updatePostData, user)
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe, PostExistsPipe) id: number) : Promise<void> {
    this.postService.remove(id)
  }

}
