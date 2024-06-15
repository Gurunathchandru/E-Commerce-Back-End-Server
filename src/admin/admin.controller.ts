import { Controller } from '@nestjs/common';
import {Body ,Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { ApiCreatedResponse, ApiResponseProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Add New Admin')
@ApiCreatedResponse()
@Controller('admin')
export class AdminController {
    constructor(private readonly adminservice:AdminService){}

    @Post('addadmin')
    async addNewAdmin(@Body() data:AdminDto )
    {
        return await this.adminservice.addNewAdmin(data);
    }

}
