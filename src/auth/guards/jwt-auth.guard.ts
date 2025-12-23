import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// Protects routes that require authentication

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt"){

    
}
