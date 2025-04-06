import { CreateUserDTO } from '@application/dtos/user/create-user'
import { UpdateUserDTO } from '@application/dtos/user/update-user'
import { UserUseCase } from '@application/use-cases/user/user.use-case'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userUseCase: UserUseCase,
  ) {}

  @ApiOperation({
    summary: 'Create user',
    description: 'Create a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Post()
  async create(@Body() body: CreateUserDTO) {
    const createUser = await this.userUseCase.createUser(body)

    return createUser
  }

  @ApiOperation({
    summary: 'Find all users',
    description: 'Find all users',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Get('/all')
  async findAll() {
    const findUsers = await this.userUseCase.findAll()

    return findUsers
  }

  @ApiOperation({
    summary: 'Find user by id',
    description: 'Find user by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.userUseCase.findById(id)
  }

  @ApiOperation({
    summary: 'Find user by id',
    description: 'Find user by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return await this.userUseCase.updateUser(id, body)
  }

  @ApiOperation({
    summary: 'Delete user by id',
    description: 'Delete user by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userUseCase.deleteUser(id)
  }
}
