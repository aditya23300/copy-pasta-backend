import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const apiKey = request.headers['cleanup-api-key'];
    if (!apiKey || apiKey !== process.env.CLEANUP_API_KEY) {
      throw new UnauthorizedException('Invalid or missing API key');
    }

    return true;
  }
}
