import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { InstitutionStatusEnum } from "@domain/entities/institution";
import { CreateUserDTO } from "../user/create-user";

export class CreateInstitutionDto {
  @ApiProperty({
    required: false,
    example: "123456789",
    description: "Institution cnpj",
  })
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiProperty({
    required: true,
    example: -31.012,
    description: "Institution latitude",
  })
  @Type(() => Number)
  @IsNumber()
  latitude: number;

  @ApiProperty({
    required: true,
    example: 41.123,
    description: "Institution longitude",
  })
  @Type(() => Number)
  @IsNumber()
  longitude: number;

  @ApiProperty({
    required: false,
    example: "ACTIVE",
    description: "Institution status",
  })
  @IsEnum(InstitutionStatusEnum)
  @IsString()
  status?: InstitutionStatusEnum;

}

export class CreateInstitutionWithUserDto {
    @ApiProperty({ type: () => CreateInstitutionDto })
    @ValidateNested()
    @Type(() => CreateInstitutionDto)
    institution: CreateInstitutionDto;
  
    @ApiProperty({ type: () => CreateUserDTO })
    @ValidateNested()
    @Type(() => CreateUserDTO)
    user: CreateUserDTO;
  }
