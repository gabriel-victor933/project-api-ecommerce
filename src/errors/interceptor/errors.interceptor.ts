import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class DatabaseErrorsInterceptor implements NestInterceptor {
  private badRequestMessage: string;
  private conflictMessage: string;
  constructor(
    badRequestMessage?: string | undefined,
    conflictMessage?: string | undefined,
  ) {
    this.badRequestMessage = badRequestMessage ?? 'Bad Request!';
    this.conflictMessage = conflictMessage ?? 'Conflict';
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof QueryFailedError) {
          if (err.driverError.code == '23505') {
            return throwError(
              () => new ConflictException(this.conflictMessage),
            );
          }

          if (err.driverError.code == '23503') {
            return throwError(
              () => new BadRequestException(this.badRequestMessage),
            );
          }
        }

        if (err?.status == 400) {
          return throwError(() => new BadRequestException(err.response));
        }

        return throwError(() => new InternalServerErrorException());
      }),
    );
  }
}
