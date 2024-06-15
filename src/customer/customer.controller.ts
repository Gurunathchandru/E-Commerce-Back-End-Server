import { Body,Controller,Post } from '@nestjs/common';
import { ApiAcceptedResponse,ApiBody,ApiCreatedResponse,ApiOkResponse,ApiQuery, ApiResponse, ApiTags, SwaggerModule } from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {


    constructor(private CustomerService : CustomerService){}

    // @UseGuards(TestGuard)
    @ApiCreatedResponse()
    // @SwaggerModule
    @ApiTags('Customet signup')
    @Post('signup')
    createSignup(@Body() body : CustomerDto) : Promise<any>{
        return this.CustomerService.signUp(body)
    }

}
