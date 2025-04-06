import { LanguageEnum } from '@domain/entities/user'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator'

export class UpdateUserDTO {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe Att',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string

  @ApiProperty({
    description: 'User email',
    example: 'johndoe@example.com',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string

  @ApiProperty({
    description: 'User password',
    example: 'batata@123',
    required: false,
  })
  @IsOptional()
  @MinLength(8)
  @IsString()
  password?: string

  @ApiProperty({
    description: 'User phone',
    example: '5551982721312',
    required: false,
  })
  @IsOptional()
  @MinLength(11)
  @IsString()
  phone?: string

  @ApiProperty({
    description: 'User city',
    example: 'Porto Alegre',
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string

  @ApiProperty({
    description: 'User state',
    example: 'Rio Grande do Sul',
    required: false,
  })
  @IsOptional()
  @IsString()
  state?: string

  @ApiProperty({
    description: 'User main language',
    example: LanguageEnum.ENGLISH,
    required: false,
  })
  @IsOptional()
  @IsEnum(LanguageEnum)
  language?: LanguageEnum
}
