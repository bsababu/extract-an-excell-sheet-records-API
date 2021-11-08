/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import {Strategy, ExtractJwt} from 'passport-jwt';
import { JwtPayrol } from "./jwt-payroll.interface";
import { User } from "./auth.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51',
        });
    }

    async validate(payRoll: JwtPayrol): Promise<User> {
        const {username} = payRoll;
        const user = await this.userRepository.findOne({username});

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }

}