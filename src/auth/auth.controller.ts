import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from './entities/user.entity';
import { RolesGuard } from './guards/roles.guard';

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


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser() user: any){
    return user 

  }


  @Post('create-admin')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createAdmin(@Body() registerDto: RegisterDto){
    this.authServie.registerAdmin(registerDto)
  }


}
