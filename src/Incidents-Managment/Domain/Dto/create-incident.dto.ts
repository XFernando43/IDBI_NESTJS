import { ApiProperty } from '@nestjs/swagger';

export class CreateIncidentDto {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  subject: string;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  details: string;
  @ApiProperty()
  status: string;
//   @ApiProperty()
//   createAt: Date;
//   @ApiProperty()
//   updateAt: Date;
}
