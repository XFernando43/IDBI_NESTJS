import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CommentsService } from '../Service/comments.service';
import { CreateCommentDto } from '../../Domain/Dto/Comment/create-comment.dto';
import { UpdateCommentDto } from '../../Domain/Dto/Comment/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/Authentication-Managment/Decorator/role.decorator';
import { RolesGuard } from 'src/Authentication-Managment/Guards/roles.guard';
import { Role } from 'src/Authentication-Managment/Domain/enum/roles.enum';

@ApiTags("Comments")
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @Roles(Role.Staff, Role.User)
  @UseGuards(RolesGuard)
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @Roles(Role.Staff, Role.User)
  @UseGuards(RolesGuard)
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @Roles(Role.Staff, Role.User)
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Get('obtenerPorIncidentes/:id')
  @Roles(Role.Staff, Role.User)
  @UseGuards(RolesGuard)
  commetsByIncidetID(@Param('id') id: string) {
    return this.commentsService.GetCommentsbyIncidentId(+id);
  }

  @Patch(':id')
  @Roles(Role.Staff, Role.User)
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @Roles(Role.Staff, Role.User)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
