
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    PassportStrategy
} from '@nestjs/passport'
import {
    Strategy
} from 'passport-google-oauth20'
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private configService: ConfigService) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
            scope: ['profile', 'email']
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: string) {
        console.log('validate', accessToken, refreshToken, profile);
    }
}