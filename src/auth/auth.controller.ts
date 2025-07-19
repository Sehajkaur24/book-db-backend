import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() data: SignUpDto) {
    return this.authService.register(data);
  }

  @Post('login')
  login(@Body() data: SignInDto) {
    return this.authService.login(data);
  }
}
