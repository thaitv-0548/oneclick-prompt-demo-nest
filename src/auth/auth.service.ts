import { Injectable, HttpStatus } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { ResponseData } from '../global/global.data';
import { HttpMessage } from '../global/global.emun';

@Injectable()
export class AuthService {
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>;

    async validateUser(userDto: UserDto): Promise<User> {
        const user = await this.userRepository.findOneBy({ email: userDto.email });
        console.log('user', user);
        if (user) return user;
        const newUser = this.userRepository.create({ ...userDto });
        console.log('newUser', newUser);
        return await this.userRepository.save(newUser);
    }

    async findUser(id: string): Promise<User> {
        return await this.userRepository.findOneBy({ id });
    }

    status(req: Request) {
        const msg = {
            user: req.user,
            session_ex: req.session.cookie.expires,
        };
        if (req.isAuthenticated()) {
            return new ResponseData(msg, HttpStatus.OK, HttpMessage.SUCCESS_OK);
        } else {
            return new ResponseData(null, HttpStatus.UNAUTHORIZED, HttpMessage.ERROR_UNAUTHORIZED);
        }
    }


}
