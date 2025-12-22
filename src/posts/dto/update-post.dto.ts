
import { IsOptional, IsString,  MaxLength,  MinLength} from "class-validator"

export class UpdatePostDto{

  @IsOptional()
  @IsString({message:'Title must be a string '})
  @MinLength(3,{message: 'Title must be atleast 3 chars long'})
  @MaxLength(50, {message:'Title can not be longer than 50 chars'})
  title: string


  @IsOptional()
  @IsString({message:'Content must be a string '})
  @MinLength(3,{message: 'Content must be atleast 3 chars long'})
  content: string

  @IsOptional()
  @IsString({message:'Author name must be a string '})
  @MinLength(3,{message: 'Author name must be atleast 3 chars long'})
  @MaxLength(50, {message:'Author can not be longer than 50 chars'})
  authorName: string

}