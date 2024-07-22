import { Controller, Get, Req, UseGuards, Res, HttpStatus  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './Strategy/Guards';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(@Req() req: Request,) {
    console.log('google login', req);
    return { message: 'Google Login' };
  }
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    return res.redirect('https://chatgpt.com');
  }

  @Get('status')
  status(@Req() req: Request) {
    console.log(req.session.cookie.expires.getSeconds());
    console.log("session: ", req.session, req.sessionID);
    return this.authService.status(req);
  }
  @Get('logout')
  logout(@Req() req: Request, @Res() res) {
    req.logout(() => {
      console.log('logged out', req);
      res.redirect('https://chatgpt.com');
    });
  }
}
