import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/User';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userInfo } from 'os';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  throwNotFoundError() {
    // throw new HttpException('Usuário não encontrado...', HttpStatus.NOT_FOUND);
    throw new NotFoundException('Usuário não encontrado...');
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (user) return user;
    this.throwNotFoundError();
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      role: 'CLIENTE',
      active: true,
      instant: new Date(),
    };
    const user = await this.userRepository.create(newUser);
    return this.userRepository.save(user);
  }

  async updateAll(id: number, updatePutUserDto: UpdatePutUserDto) {
    const user = await this.userRepository.preload({
      id,
      ...updatePutUserDto,
    });

    if (!user) return this.throwNotFoundError();

    await this.userRepository.save(user);
    return user;
  }

  async updatePartial(id: number, updatePatchUserDto: UpdatePatchUserDto) {
    // Tem restringir os campos de alteração como no exemplo:
    // const partialUpdatePatchUserDto = {
    //   role: updatePatchUserDto?.role,
    //   active: updatePatchUserDto?.active,
    // };

    const user = await this.userRepository.preload({
      id,
      ...updatePatchUserDto,
    });

    if (!user) return this.throwNotFoundError();

    await this.userRepository.save(user);
    return user;
  }

  async delete(id: number) {
    const user = await this.userRepository.findOneBy({
      id,
    });

    if (!user) return this.throwNotFoundError();

    return this.userRepository.remove(user);
  }
}
