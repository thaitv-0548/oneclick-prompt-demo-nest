import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './Strategy/google.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'google' })],
  controllers: [AuthController],
  providers: [AuthService,  GoogleStrategy],
})
export class AuthModule {

}
