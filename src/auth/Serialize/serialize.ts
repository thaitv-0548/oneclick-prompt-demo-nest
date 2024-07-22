import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";
@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        private readonly authService: AuthService        
    ) {
        super();
    }
    serializeUser(user: any, done: Function) {
        done(null, user);
    }

    async deserializeUser(payload: any, done: Function) {
        const user = await this.authService.findUser(payload.id);
        console.log("desria: ",JSON.stringify(user));
        return user ? done(null, user) : done(null, null);
      }
}