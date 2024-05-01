import { Module } from '@nestjs/common';
import { UserTypesService } from '../Application/Services/user-types.service';
import { UserTypesController } from '../Application/Controllers/user-types.controller';

@Module({
  controllers: [UserTypesController],
  providers: [UserTypesService],
})
export class UserTypesModule {}
