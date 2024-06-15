import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric,IsEmail,IsString,Length,Matches,MaxDate,MaxLength,isAlphanumeric,isString,validateOrReject,} from "class-validator"; 

export class CustomerDto{

    // @ApiProperty()
    // c_id :number;

    @ApiProperty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    @Length(8,16)
    password:string;
    
    @ApiProperty()
    // @IsAlphanumeric()
    @IsString()
    first_name:string;

    @ApiProperty()
    // @IsAlphanumeric()
     @IsString()
    last_name:string;

    @ApiProperty()
    // @IsAlphanumeric()
    @IsEmail()
    email:string;

    @ApiProperty()
    // @IsAlphanumeric()
    phone:string;

    @ApiProperty()
    // @IsAlphanumeric()
    address:string;
}