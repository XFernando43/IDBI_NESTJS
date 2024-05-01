import { ApiProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator";

export class LogginAccountDto {
    
    @ApiProperty()
    @MinLength(5,{message:"min character for name must be 5"})
    email:string;
    @MinLength(5,{message:"min character for lastname must be 5"})
    @ApiProperty()
    password:string;
   
}
