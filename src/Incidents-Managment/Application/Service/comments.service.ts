import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from '../../Domain/Dto/Comment/create-comment.dto';
import { UpdateCommentDto } from '../../Domain/Dto/Comment/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/Incidents-Managment/Domain/Entities/comment.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/Authentication-Managment/Application/Services/user.service';
import { IncidentService } from './incident.service';

@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private CommentRepository:Repository<Comment>,
              private userService:UserService, private IncidentService:IncidentService){}
  async create(createCommentDto: CreateCommentDto) {
    try{
      const UserDB = await this.userService.findOne(createCommentDto.userId);
      if(!UserDB){
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Not User Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const incidentDB = await this.IncidentService.findOne(createCommentDto.incidentID);
      if(!incidentDB){
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Not comment not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const nowDate = new Date();

      const newComment = new Comment(incidentDB,UserDB,createCommentDto.content,nowDate);
      const newCommentDB = await this.CommentRepository.create(newComment);
      return await this.CommentRepository.save(newCommentDB);
    }catch(error){
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error updating comment',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try{
      const comments = await this.CommentRepository.find();
      if(!comments || comments.length <= 0){
        throw new HttpException(
          {
            status: HttpStatus.OK,
            message: 'Not comment in dataBase Alredy',
            data:comments
          },
          HttpStatus.OK,
        );
      }
      return comments;
    }catch(error){
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error to get All comments',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const comment = await this.CommentRepository.findOne({where:{commentId:id}});
      if (!comment) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Not comment Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return comment;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error retrieving comment',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      const comment = await this.CommentRepository.findOne({where:{commentId:id}});
      if (!comment) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Not incident Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      this.CommentRepository.merge(comment, updateCommentDto);
      return await this.CommentRepository.save(comment);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error updating incident',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const comment = await this.CommentRepository.findOne({where:{commentId:id}});
      if (!comment) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'Not comment Found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      await this.CommentRepository.remove(comment);
      return { message: `Incident with ID ${id} deleted successfully` };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error deleting incident',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  async GetCommentsbyIncidentId(id:number){
    try{
      
      const incidentDB = await this.IncidentService.findOne(id);
      const comments = await this.CommentRepository.find({
        where:{
          incident:incidentDB,
        }
      });


      if(!comments || comments.length <= 0){
        throw new HttpException(
          {
            status: HttpStatus.OK,
            message: 'Not comments in dataBase Alredy',
            data:comments
          },
          HttpStatus.OK,
        );
      }
      return comments;
    }catch(error){
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Error to get All comments',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
