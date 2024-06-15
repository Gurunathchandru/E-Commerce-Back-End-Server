
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "../decorators/roles.decorators";
import { LoginDto } from "src/auth/dto/login-request.dto";
import {Request } from "express"
 
// const users ={
//     username : "aman",
//    roles : ['Admin','Customers']
// }


@Injectable()
export class RolesGuard implements CanActivate{ 

    //  logoinDetails = new LoginDto();

    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        console.log("inside role guard");
        
        const requiredRoles=this.reflector.get('roles',context.getHandler());
        if(!requiredRoles || requiredRoles.length === 0){
        return true;
      }

      const request = context.switchToHttp().getRequest<Request>();
      const logoinDetails : LoginDto = request.body;

      const userType = logoinDetails.userType;
      if(requiredRoles.includes(userType)){
        return true;
      }else{
        false;
      }
     console.log(requiredRoles);
       
        return false;
    } 
} 