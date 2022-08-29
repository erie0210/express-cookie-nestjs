import { Controller, Get, Req, Res } from '@nestjs/common';
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
  getHello(@Req() req, @Res() res) {
    const data = { name: 'joie' };
    const token = this.createToken(data);
    res.cookie('auth_token', token, {
      httpOnly: true,
      maxAge: null,
      domain: req.hostname.split('.').slice(-2).join('.'),
    });
    res.send(this.appService.getHello());
  }
}
