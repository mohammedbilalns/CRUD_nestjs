import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

  constructor(
    private authServie : AuthService
  ){}


  @Post('register')
  register(@Body() registerDto: RegisterDto){
    return this.authServie.register(registerDto)
  }

  @Post('login')
  login(@Body() loginDto: LoginDto){
    return this.authServie.login(loginDto)
  }

  @Post('refresh')
  refreshToken(@Body('refreshToken') refreshToken : string){
    return this.authServie.refreshToken(refreshToken)
  }




}
