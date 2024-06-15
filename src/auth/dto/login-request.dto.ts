import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString, Length } from "class-validator";

export class LoginDto {
    @ApiProperty({description: 'The username of the customer who wants to login'})
    @IsString()
    @Length(8,16)
    email:string;

    @ApiProperty({description: 'This is the user\'s password'})
    @IsString()
    password: string;

    @ApiProperty({description: 'Key to identify if it is Customer login or admin login'})
    @IsString()
    @IsIn(['Customer', 'Admin'])
    userType: string;
}