import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login-request.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) { }

    @ApiTags('Login')
    @Post('login')
    async login (@Body() data: LoginDto ) {
        return await this.authService.login(data);
    }

    // @Post('test')
    // async test(@Body() data: LoginDto) {
    //     return await this.authService.insertData(data);
    // }
    
}
