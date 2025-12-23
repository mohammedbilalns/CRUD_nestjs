import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { UserRole } from "../entities/user.entity";


@Injectable()
export class RolesGuard  implements CanActivate{

  // Reflector -> utitlity that will help to access metadata 
  constructor(private reflector: Reflector){}

  // canActivate method will be called by the guards pipeline to retrive the roles metadata set by the decorator

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY, [
        context.getHandler(), //method level metadata
        context.getClass() // class level metadata
      ]
    )

    if(!requiredRoles) return true

    const {user} = context.switchToHttp().getRequest()

    if(!user) throw new ForbiddenException("User not authenticated")

    const hasRequiredRole = requiredRoles.some(role => user.role === role)

    if(!hasRequiredRole) throw new ForbiddenException("Insufficient permissions")

    return true 
  }
}
