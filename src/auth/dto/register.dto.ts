import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class RegisterDto{

  @IsEmail({}, {message: 'Email is not valid'})
  email: string

  @IsNotEmpty({message: " Name is required"})
  @IsString({message:'Name must be a string '})
  @MinLength(3,{message: 'Name must be atleast 3 chars long'})
  @MaxLength(50, {message:'Name can not be logner than 50 chars'})
  name: string


  @IsNotEmpty({message: "Name is required"})
  @MinLength(3,{message: 'password must be atleast 3 chars long'})
  password: string


}
