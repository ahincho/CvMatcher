import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ExceptionResponse } from 'src/commons/infrastructure/adapters/in/rest/dtos/exception.response';
import { JobNotFoundException } from 'src/jobs/domain/exceptions/job.not.found.exception';
import { Request, Response } from 'express';

@Catch(JobNotFoundException)
export class JobHttpExceptionFilter implements ExceptionFilter {
  private readonly exceptionToStatusMap = new Map<Function, number>([
    [JobNotFoundException, HttpStatus.NOT_FOUND],
  ]);
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const path = request.url;
    const method = request.method;
    const status: number =
      this.exceptionToStatusMap.get(exception.constructor) ??
      HttpStatus.INTERNAL_SERVER_ERROR;
    const statusDescription = HttpStatus[status] || 'Internal server error';
    const message = exception.message || 'Internal server error';
    const exceptionResponse = new ExceptionResponse({
      path: path,
      method: method,
      statusCode: status,
      statusDescription: statusDescription,
      message: message,
    });
    response.status(Number(status)).json(exceptionResponse);
  }
}
