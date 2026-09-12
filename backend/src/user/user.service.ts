import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/User';

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
      instant: new Date(),
    },
  ];
  async findAll() {
    return this.users;
  }

  async findOne(id: number) {
    const user = this.users.find((item) => item.id === id);

    if (user) return user;

    throw new HttpException('Usuário não encontrado...', HttpStatus.NOT_FOUND);
  }

  async create(body: any) {
    this.lastId++;
    const id = this.lastId;
    const newUser = {
      id,
      ...body,
    };
    this.users.push(newUser);
    return newUser;
  }

  async updateAll(data: any, id: number) {
    return { data };
  }

  async updatePartial(body: any, id: number) {
    const userExistenteIndex = this.users.findIndex((item) => item.id === id);
    if (userExistenteIndex >= 0) {
      const userExistente = this.users[userExistenteIndex];

      this.users[userExistenteIndex] = {
        ...userExistente,
        ...body,
      };
      return this.users[userExistenteIndex];
    }
  }

  async delete(id: number) {
    const userExistIndex = this.users.findIndex((item) => item.id === id);
    if (userExistIndex >= 0) {
      this.users.splice(userExistIndex, 1);
    }
    return { id };
  }
}
