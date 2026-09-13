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
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) return this.throwNotFoundError();

    return this.userRepository.remove(user);
  }
}
