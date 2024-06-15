import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class AddtoCart{
      
    @ApiProperty({required :false})
    p_name : string;

    @ApiProperty()
    quantity: number;

}