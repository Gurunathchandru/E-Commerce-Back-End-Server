import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNumber, maxLength } from "class-validator";

export class CartDto{

    // @ApiProperty()
    // @IsNumber()
    // // @IsAlphanumeric()
    // p_id:number;

    @ApiProperty()
     @IsAlphanumeric()
    p_name:string;

    @ApiProperty()
    p_price : number;

    @ApiProperty()
    // @IsAlphanumeric()
    quantity :number;
}