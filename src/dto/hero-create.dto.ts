import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class HeroCreateDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  description: string;
}
