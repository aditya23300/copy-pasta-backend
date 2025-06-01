import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateDataDto {
  @IsString({ message: 'data must be a string' })
  @IsNotEmpty({ message: 'data should not be empty' })
  @MinLength(1, { message: 'data must be at least 1 characters long' })
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  data: string;
}
