import { LanguageEnum } from '@domain/entities/user'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator'

export class CreateUserDTO {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe Att',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'User email',
    example: 'johndoe@example.com',
    required: true,
  })
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'User password',
    example: 'batata@123',
    required: true,
  })
  @IsString()
  @MinLength(8)
  password: string

  @ApiProperty({
    description: 'User phone',
    example: '5551982721312',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  phone: string

  @ApiProperty({
    description: 'User city',
    example: 'Porto Alegre',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  city: string

  @ApiProperty({
    description: 'User state',
    example: 'Rio Grande do Sul',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  state: string

  @ApiProperty({
    description: 'User main language',
    example: LanguageEnum.ENGLISH,
    required: true,
  })
  @IsEnum(LanguageEnum)
  @IsNotEmpty()
  language: LanguageEnum
}
