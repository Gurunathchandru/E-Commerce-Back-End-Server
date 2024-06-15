import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNumber, maxLength } from "class-validator";

export class ProductDto{

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
    @IsAlphanumeric()
    sku: string;

    @ApiProperty()
    @IsAlphanumeric()
    description :string;

    @ApiProperty()
    @IsAlphanumeric()
    enabled:string;

}