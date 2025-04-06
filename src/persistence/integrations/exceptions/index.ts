import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import {
  ExceptionParams,
  ExceptionsAdapter,
} from 'src/domain/adapters/exceptions'

@Injectable()
export class ExceptionsIntegration implements ExceptionsAdapter {
  badRequest(data: ExceptionParams): void {
    throw new BadRequestException(data)
  }

  internalServerError(data?: ExceptionParams): void {
    throw new InternalServerErrorException(data)
  }

  forbidden(data?: ExceptionParams): void {
    throw new ForbiddenException(data)
  }

  unauthorized(data?: ExceptionParams): void {
    throw new UnauthorizedException(data)
  }

  notFound(data?: ExceptionParams): void {
    throw new NotFoundException(data)
  }
}
