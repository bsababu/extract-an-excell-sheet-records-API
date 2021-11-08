import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuthenticationDto } from './dto/auth-credentials.dto';
import { JwtPayrol } from './jwt-payroll.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        // eslint-disable-next-line no-unused-vars
        private userRepository:UserRepository,
        // eslint-disable-next-line no-unused-vars
        private jwtService: JwtService,
    ){}

    async signUp(userCredentialsDto: UserAuthenticationDto): Promise<void> {
        return this.userRepository.signUp(userCredentialsDto);
    }

    
    async singIn(userCredentialsDto: UserAuthenticationDto): Promise<{accessToken: string}> {
        const username = await this.userRepository.validateUserPassword(userCredentialsDto);
        if(!username) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const payrol:JwtPayrol = {username};
        const accessToken = await this.jwtService.sign(payrol);

        return {accessToken};
    }
}
