import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; 

    if (!token) {
        throw new UnauthorizedException();
    }

    console.log(token);

    try {
      const decoded = this.jwtService.verify(token); 
      request.user = decoded; 
      return true; 
    } catch (err) {
      return false;
    }
  }
}
