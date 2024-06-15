import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginResponseDto {
    @ApiProperty()
    @IsString()
    firstName: string;

    @ApiProperty()
    @IsString()
    lastName: string;

    @ApiProperty()
    @IsString()
    email:string;

    @ApiProperty()
    @IsString()
    phone:string;

    constructor(firstName: string, lastName:string, email: string, phone: string) {
        this.firstName = firstName;
        this.email = email;
        this.lastName = lastName;
        this.phone = phone;
    }

    
}