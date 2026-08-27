import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : Number(HttpStatus.INTERNAL_SERVER_ERROR);

    const errorResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
          };

    const message =
      typeof errorResponse === 'string'
        ? errorResponse
        : ((errorResponse as { message?: string }).message ??
          'Unexpected error');
    const errorCode =
      typeof errorResponse === 'object' &&
      errorResponse !== null &&
      'errorCode' in errorResponse
        ? String((errorResponse as { errorCode: string }).errorCode)
        : status === Number(HttpStatus.INTERNAL_SERVER_ERROR)
          ? 'INTERNAL_SERVER_ERROR'
          : 'HTTP_ERROR';

    this.logger.error(
      `${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(status).json({
      success: false,
      message,
      errorCode,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
