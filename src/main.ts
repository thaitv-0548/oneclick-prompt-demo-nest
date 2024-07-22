import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as sesson from 'express-session'
import * as passport from 'passport'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for cross-origin requests
  app.setGlobalPrefix('api')
  app.use(sesson({
    secret: 'sdaksjdsadjpwdpowk',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000} 
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(8000);
}
bootstrap();
