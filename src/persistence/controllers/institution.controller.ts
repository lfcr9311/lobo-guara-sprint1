import { CreateInstitutionWithUserDto } from "../../application/dtos/institution/create-institution.dto";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateInstitutionDto } from "@application/dtos/institution/update-institution.dto";
import { CreateUserDTO } from "@application/dtos/user/create-user";
import { InstitutionUseCase } from "@application/use-cases/institution/institution.use-case";

@ApiTags("Institution")
@Controller("institution")
export class InstitutionController {
  constructor(
    private readonly institutionUseCase: InstitutionUseCase
  ) { }

  @Post()
  @ApiOperation({ summary: "Create institution", description: "Create a new institution" })
  @ApiResponse({
    status: 201,
    description: "Institution created successfully",
  })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 404, description: "Institution not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  @ApiBody({
    description: "Institution data",
    type: CreateInstitutionWithUserDto,
  })
  async create(@Body() body: CreateInstitutionWithUserDto) {
    const { institution, user } = body;
    return await this.institutionUseCase.createInstitution(institution, user);
  }

  @Get()
  @ApiOperation({ summary: "List all institutions" })
  @ApiResponse({ status: 200, description: "List of institutions" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 404, description: "No institutions found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async list() {
    return await this.institutionUseCase.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get institution by ID" })
  @ApiResponse({ status: 200, description: "Institution found" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 404, description: "Institution not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async get(@Param("id") institutionId: string) {
    return await this.institutionUseCase.findById(institutionId);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update institution by ID" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Institution updated successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 404, description: "Institution not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async update(
    @Param("id") institutionId: string,
    @Body() body: UpdateInstitutionDto
  ) {
    return await this.institutionUseCase.updateInstitution(institutionId, body);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete institution by ID" })
  @ApiParam({ name: "id", type: "string" })
  @ApiResponse({ status: 200, description: "Institution deleted successfully" })
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 404, description: "Institution not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async delete(@Param("id") institutionId: string) {
    return await this.institutionUseCase.deleteInstitution(institutionId);
  }
}
