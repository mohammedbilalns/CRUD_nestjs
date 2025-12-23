
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";


export class LoginDto{

  @IsEmail({}, {message: 'Email is not valid'})
  email: string


  @IsNotEmpty({message: " Password is required"})
  @MinLength(3,{message: 'password must be atleast 3 chars long'})
  password: string


}
