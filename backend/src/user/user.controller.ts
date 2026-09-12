import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body: any) {
    return { body };
  }

  @Get()
  async listAll() {
    return { users: [] };
  }

  @Get(':id')
  async listOne(@Param() params: any) {
    return { user: {}, params };
  }

  @Put(':id')
  async update(@Body() body: any, @Param() params: any) {
    return {
      method: 'put',
      body,
      params,
    };
  }

  @Patch(':id')
  async updatePartial(@Body() body: any, @Param() params: any) {
    return {
      method: 'patch',
      body,
      params,
    };
  }

  @Delete(':id')
  async delete(@Param() params: any) {
    return { params };
  }
}
