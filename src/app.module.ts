import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromptModule } from './prompt/prompt.module';
import { Prompt } from './prompt/entities/prompt.entity';

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
        entities: [Prompt], // Add your entities here
        synchronize: true,
      }),
      inject: [ConfigService], // Don't forget to inject ConfigService
    }),
    PromptModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
