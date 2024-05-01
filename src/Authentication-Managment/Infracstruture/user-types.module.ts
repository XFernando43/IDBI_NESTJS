import { Module } from '@nestjs/common';
import { UserTypesService } from '../Application/Services/user-types.service';
import { UserTypesController } from '../Application/Controllers/user-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserType } from '../Domain/Entities/user-type.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserType])],
  controllers: [UserTypesController],
  providers: [UserTypesService],
})
export class UserTypesModule {}
