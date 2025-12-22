import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host:'localhost',
      port:5432,
      username: 'nestuser',
      password: 'nestpass',
      database: 'nest-project',
      entities: [Post], // array of entities
      synchronize: true,
    }),
    PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
