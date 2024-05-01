import { Module } from '@nestjs/common';
import { CommentsService } from '../Application/Service/comments.service';
import { CommentsController } from '../Application/Controller/comments.controller';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
