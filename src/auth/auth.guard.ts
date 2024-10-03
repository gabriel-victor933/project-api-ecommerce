import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers['x-api-key']) return false;

    return this.validateKey(request.headers['x-api-key']);
  }

  async validateKey(key: string) {
    const password = process.env.API_SECRET;

    const isMatch = await bcrypt.compare(password, key);

    return isMatch;
  }
}
