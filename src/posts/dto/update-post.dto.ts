
import { Optional } from "@nestjs/common"
import { IsNotEmpty,IsString,  MaxLength,  MinLength} from "class-validator"

export class UpdatePostDto{

  @Optional()
  @IsNotEmpty({message: "Title is required"})
  @IsString({message:'Title must be a string '})
  @MinLength(3,{message: 'Title must be atleast 3 chars long'})
  @MaxLength(50, {message:'Title can not be logner than 50 chars'})
  title: string


  @Optional()
  @IsNotEmpty({message: "Title is required"})
  @IsString({message:'Title must be a string '})
  @MinLength(3,{message: 'Title must be atleast 3 chars long'})
  content: string

  @Optional()
  @IsNotEmpty({message: "Author is required"})
  @IsString({message:'Author name  must be a string '})
  @MinLength(3,{message: 'Author name  must be atleast 3 chars long'})
  @MaxLength(50, {message:'Authour can not be logner than 50 chars'})
  authorName: string

}
