import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromptModule } from './prompt/prompt.module';
import { Prompt } from './prompt/entities/prompt.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [Prompt, User], // Add your entities here
        synchronize: true,
      }),
      inject: [ConfigService], // Don't forget to inject ConfigService
    }),
    PromptModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
