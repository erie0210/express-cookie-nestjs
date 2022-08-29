import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import jwt from 'jsonwebtoken';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  createToken(data: object) {
    return jwt.sign(
      {
        ...data,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 60,
      },
      '_secret',
    );
  }

  @Get()
  getHello(@Res() res) {
    const data = { name: 'joie' };
    const token = this.createToken(data);
    res.cookie('auth_token', token, { httpOnly: true, maxAge: null });
    res.send(this.appService.getHello());
  }
}
