import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric,IsEmail,Matches,MaxDate,MaxLength,maxDate,validateOrReject,} from "class-validator"; 

export class AdminDto{

    @ApiProperty()
    admin_id : number;
    
    @ApiProperty()
    admin_name:string;

    @ApiProperty()
    // @IsAlphanumeric()
    @IsEmail()
     email:string;

    @ApiProperty()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    password:string;

}