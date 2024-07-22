import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './Strategy/google.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SessionSerializer } from './Serialize/serialize';
import { GoogleAuthGuard } from './Strategy/Guards';

@Module({
  imports: [PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AuthController],
  providers: [AuthService,  GoogleStrategy, SessionSerializer, GoogleAuthGuard],
})
export class AuthModule {
  
}
