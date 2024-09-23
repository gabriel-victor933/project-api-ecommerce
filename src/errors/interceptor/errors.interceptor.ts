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

@Injectable()
export class DatabaseErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err.code == '23505') {
          return throwError(
            () => new ConflictException('Name is already in use!'),
          );
        }
        if (err?.status == 400) {
          return throwError(() => new BadRequestException(err.response));
        }

        return throwError(() => new InternalServerErrorException());
      }),
    );
  }
}
