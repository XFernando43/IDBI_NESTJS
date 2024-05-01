import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
   
    @ApiProperty()
    incidentID:number;

    @ApiProperty()
    userId: number;
    
    @ApiProperty()
    content:string;

}
