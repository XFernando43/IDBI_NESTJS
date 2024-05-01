import { Module } from '@nestjs/common';
import { CommentsService } from '../Application/Service/comments.service';
import { CommentsController } from '../Application/Controller/comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../Domain/Entities/comment.entity';
import { UserModule } from 'src/Authentication-Managment/Infracstruture/user.module';
import { IncidentModule } from './incident.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Comment]),
    UserModule,
    IncidentModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
