import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() pagination: any) {
    const { limit = 10, offset = 0 } = pagination;
    console.log(pagination);
    return `Lista todos usuários. Limit=${limit}, offset=${offset}`;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return { user: {}, id };
  }

  @Post()
  async create(@Body() body: any) {
    return { body };
  }

  @Put(':id')
  async update(@Body() body: any, @Param('id', ParseIntPipe) id: number) {
    return {
      method: 'put',
      body,
      id,
    };
  }

  @Patch(':id')
  async updatePartial(
    @Body() body: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return {
      method: 'patch',
      body,
      id,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
