import { ApiProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator";

export class UpdateUserDto {
    @ApiProperty()
    @MinLength(5,{message:"min character for name must be 5"})
    name:string;
    @MinLength(5,{message:"min character for lastname must be 5"})
    @ApiProperty()
    lastName:string;
    @ApiProperty()
    @MinLength(10,{message:"min character for phone must be 10"})
    phone:string;
    @ApiProperty()
    typeId: number;

}
