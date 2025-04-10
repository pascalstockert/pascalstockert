import { Controller, Get } from '@nestjs/common';
import { PostsService } from '../../services/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getPosts(): Promise<void> {

  }
}
