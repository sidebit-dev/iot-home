import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/User';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';

@Injectable()
export class UserService {
  private lastId = 1;
  private users: User[] = [
    {
      id: 1,
      name: 'Migue Ramos',
      email: 'miguel@gmail.com',
      password: '123456',
      role: 'ADMIN',
      active: true,
    },
  ];

  throwNotFoundError() {
    // throw new HttpException('Usuário não encontrado...', HttpStatus.NOT_FOUND);
    throw new NotFoundException('Usuário não encontrado...');
  }

  async findAll() {
    return this.users;
  }

  async findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    // const userExistenteIndex = this.users.findIndex((item) => item.id === id);

    if (user) return user;
    this.throwNotFoundError();
  }

  async create(createUserDto: CreateUserDto) {
    this.lastId++;
    const id = this.lastId;
    const newUser = {
      id,
      ...createUserDto,
      role: 'CLIENTE',
      active: true,
      instant: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  async updateAll(id: number, updatePutUserDto: UpdatePutUserDto) {
    const userExistenteIndex = this.users.findIndex((item) => item.id === id);

    if (userExistenteIndex < 0) {
      this.throwNotFoundError();
    }

    const userExistente = this.users[userExistenteIndex];

    this.users[userExistenteIndex] = {
      ...userExistente,
      ...updatePutUserDto,
    };
    return this.users[userExistenteIndex];
  }

  async updatePartial(id: number, updatePatchUserDto: UpdatePatchUserDto) {
    const userExistenteIndex = this.users.findIndex((item) => item.id === id);

    if (userExistenteIndex < 0) {
      this.throwNotFoundError();
    }

    const userExistente = this.users[userExistenteIndex];

    this.users[userExistenteIndex] = {
      ...userExistente,
      ...updatePatchUserDto,
    };
    return this.users[userExistenteIndex];
  }

  async delete(id: number) {
    const userExistenteIndex = this.users.findIndex((item) => item.id === id);

    if (userExistenteIndex < 0) {
      this.throwNotFoundError();
    }

    const user = this.users[userExistenteIndex];

    this.users.splice(userExistenteIndex, 1);

    return user;
  }
}
