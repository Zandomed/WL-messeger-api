import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request } from 'express';
import { getMetadataResponse } from 'src/core/utils/get-metadata-response';

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest<Request>();

    return next.handle().pipe(
      map(data => ({
        metadata: getMetadataResponse(request),
        success: true,
        data,
      })),
    );
  }
}
