import { SetMetadata } from "@nestjs/common"
import { UserRole } from "../entities/user.entity"

// unique identifier for storing and retrieving role requirements as metadata on router handlers 
export const ROLES_KEY = 'roles'

// roles decorator markes the routes with the roles that are allowd to access them 
// roles gaurd willl later reads this metadata to check if the user has permission 

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles)
