import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; 

    console.log(token);

    if (!token) {
        throw new UnauthorizedException('Token not found');
    }

    try {
      const decoded = this.jwtService.verify(token); 
      request.user = decoded; 

      console.log(request.user);
      console.log("-->",decoded);

      // Aquí se verifica si el usuario tiene al menos uno de los tipos permitidos
      // const userType: string = decoded.type || '';
      // if (!this.allowedTypes.includes(userType)) {
      //   throw new UnauthorizedException('You do not have permission to access this resource');
      // }

      return true; 
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
