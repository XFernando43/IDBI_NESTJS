import { Injectable, CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../Domain/enum/roles.enum';
import { ROLES_KEY } from '../Decorator/role.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
        throw new UnauthorizedException('Token not found');
    }

    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded;
      
      
      const userRoles: Role[] = decoded.type || [];
      
      const isAuthorized = requiredRoles.some((role) => userRoles.includes(role));
      
      console.log(requiredRoles);
      console.log(decoded.type);
      console.log(isAuthorized);

      return requiredRoles.some(role => userRoles.includes(role));


    } catch (error) {
      return false;
    }
  }
}
