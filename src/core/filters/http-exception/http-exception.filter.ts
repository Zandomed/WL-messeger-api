import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { getMetadataResponse } from 'src/core/utils/get-metadata-response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse: any = exception.getResponse();

    response.status(status).json({
      metadata: getMetadataResponse(request),
      success: false,
      statusCode: status,
      message: exception.message,
      errorCode: errorResponse.errorCode ? errorResponse.errorCode : null,
    });
  }
}
