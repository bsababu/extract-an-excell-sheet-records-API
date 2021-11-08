import { ConflictException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "./auth.entity";
import { UserAuthenticationDto } from "./dto/auth-credentials.dto";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signUp(userAuthDto: UserAuthenticationDto): Promise<void>{
        const {username, password} = userAuthDto;
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashedPassword(password, user.salt);


        try{
            await user.save();
        } catch (error) {
            throw new ConflictException('username already exists !');
        }
        
    }

    async validateUserPassword(authCredentialsDto: UserAuthenticationDto): Promise<string> {
        const {username, password} = authCredentialsDto;
        const user = await this.findOne({username});

        if(user && await user.vaidatePassword(password)) {
            return username;
        }

        else {
            return null;
        }
    }
    
    private async hashedPassword(password:string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}