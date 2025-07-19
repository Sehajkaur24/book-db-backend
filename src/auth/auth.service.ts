import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(data: SignUpDto): Promise<User> {
    const user = new User();
    user.email = data.email;
    user.password = data.password;
    return await this.userRepository.save(user);
  }

  async login(data: SignUpDto): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findOneBy({
      email: data.email,
    });
    if (!user) {
      throw new Error('User not found');
    }
    return {
      token: await this.jwtService.signAsync({ id: user.id }),
      user,
    };
  }
}
