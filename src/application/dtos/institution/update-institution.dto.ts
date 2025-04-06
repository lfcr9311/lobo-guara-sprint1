import { ApiProperty } from "@nestjs/swagger";
import { InstitutionStatusEnum } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class UpdateInstitutionDto {
  @ApiProperty({
    required: false,
    example: "123456789",
    description: "Institution cnpj",
  })
  @IsOptional()
  @Length(14, 14)
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
  @IsOptional()
  @IsEnum(InstitutionStatusEnum)
  status?: InstitutionStatusEnum;
}
