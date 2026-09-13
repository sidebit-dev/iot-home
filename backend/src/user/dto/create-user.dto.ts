import {
  IsBoolean,
  IsEmail,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;
  @IsEmail()
  readonly email: string;
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 0,
    minLowercase: 0,
    minUppercase: 0,
    minSymbols: 0,
  })
  readonly password: string;
  @IsString()
  readonly role: string;
  @IsBoolean()
  readonly active: boolean;
}
