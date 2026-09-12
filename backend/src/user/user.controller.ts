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
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query() pagination: any) {
    const { limit = 10, offset = 0 } = pagination;
    console.log(pagination);
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.userService.create(body);
  }

  @Put(':id')
  async updateAll(@Body() body: any, @Param('id', ParseIntPipe) id: number) {
    return this.userService.updateAll(id, body);
  }

  @Patch(':id')
  async updatePartial(
    @Body() body: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updatePartial(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
