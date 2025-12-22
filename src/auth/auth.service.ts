import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService} from "@nestjs/jwt"

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private JwtService : JwtService
  ) {}

  public async register(registerDto: RegisterDto){
    this.handleRegistration(registerDto, UserRole.USER)
  }

  public async registerAdmin(registerDto: RegisterDto){
    this.handleRegistration(registerDto, UserRole.ADMIN)
  }

  public async login(loginDto: LoginDto){
    const user = await this.userRepository.findOne({})

    if(!user || !(await this.verifyPassword(loginDto.password, user.password))){
      throw new UnauthorizedException('Invalid credentials')
    }

    const tokens = this.generateTokens(user)
    const {password, ...result} = user

    return {
      user: result,
      ...tokens
    }

  }

  public async refreshToken(refreshToken: string){
    try{
      const payload = this.JwtService.verify(refreshToken, {
        secret:'refresh secret'
      })

      const user = await this.userRepository.findOne({
        where: {id: payload.sub}
      })

      if(!user){
        throw new UnauthorizedException('Invalid token')
      }
      const accessToken = this.generateAccessToken(user)

      return {accessToken}

    }catch(e){
      throw new UnauthorizedException('Invalid token')
    }
  }

  private async  handleRegistration(registerDto: RegisterDto, role: UserRole){
    const existingUser = await this.userRepository.findOne({
      where: {email: registerDto.email}
    })

    if(existingUser) throw new ConflictException('Email already in use! Please try again with a different email.')

    const hashedPassword = await this.hashPassword(registerDto.password)

    const newUser = this.userRepository.create({
      email: registerDto.email,
      name: registerDto.name,
      password: hashedPassword,
      role: role
    })

    const savedUser = await this.userRepository.save(newUser)
    const {password , ...result} = savedUser

    return {
      user: result,
      message: "Registration successful. Please login to continue."
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10)
  }

  private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword)
  }

  private generateTokens(user: User): {accessToken: string, refreshToken: string} {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user)
    }
  }

  private generateAccessToken(user: User): string {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role
    }

    return this.JwtService.sign(payload, {
      secret:'super secure secret',
      expiresIn: '15m'
    })

  }

  private generateRefreshToken(user: User): string {
    const payload = {sub: user.id}

    return this.JwtService.sign(payload, {
      secret: 'refresh secret',
      expiresIn: "7d" 
    })

  }

}
