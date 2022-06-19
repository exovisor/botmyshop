import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersService.findOne({
      username: username,
    });

    if (!user) throw new Error('User not found');

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    return {
      access_token: this.jwtService.sign({
        _id: user._id,
        username: user.username,
      }),
    };
  }
}
