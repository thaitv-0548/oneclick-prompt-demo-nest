import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './Strategy/Guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {
    return { message: 'Google Login' };
  }
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback() {
    return { message: 'Google Callback' };
  }
}
