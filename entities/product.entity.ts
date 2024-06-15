import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ProductEntity{
    @ApiProperty()
    // @IsNumber()
    p_id : number;
      
    @ApiProperty({required :false})
    p_name : string;

    @ApiProperty()
    p_price : number;

    @ApiProperty()
    sku : string;

    @ApiProperty()
    description :string;
}