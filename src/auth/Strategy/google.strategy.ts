
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    PassportStrategy
} from '@nestjs/passport'
import {
    Strategy
} from 'passport-google-oauth20'
import { AuthService } from '../auth.service';
import { Profile } from 'passport';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    
    constructor(
        private configService: ConfigService,
        private authService: AuthService

    ) {
        super({
            clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
            scope: ['profile', 'email']
        })
    }
    async validate(profile: Profile) {
        // console.log('validate', profile)
        const email = profile.emails[0].value;
        const displayName = profile.displayName;
        const user = await this.authService.validateUser({
            email: email,
            displayName: displayName,
        });
        
        return user || null;
    }
}