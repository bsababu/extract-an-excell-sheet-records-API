/* eslint-disable no-unused-vars */
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthenticationDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private Authservice: AuthService,
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: UserAuthenticationDto): Promise<void>{
        return this.Authservice.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialsDto: UserAuthenticationDto):Promise<{accessToken: string}> {
        return this.Authservice.singIn(authCredentialsDto);
    }
}
