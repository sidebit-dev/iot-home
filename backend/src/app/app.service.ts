import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'A SKYNET não nos achou. Se Você estiver vendo esta mensagem, Você faz parte da resistência...!';
  }
}
