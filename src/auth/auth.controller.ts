import { Controller, Post, Body , UseFilters } from '@nestjs/common';
// import { AuthService } from '@auth/auth.service';
import { AuthService } from './auth.service';
import { SignUpDto, SigninDto } from './dto/auth.dto'
import { HttpExceptionFilter} from "../exception.filter"

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
      return await this.authService.signUp(signUpDto);
      
  }

  @Post('signin')
  async signIn(@Body() signinDto: SigninDto) {
    return await this.authService.signIn(signinDto);
  }
}
