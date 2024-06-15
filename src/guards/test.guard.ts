import { CanActivate, ExecutionContext } from "@nestjs/common";

export class TestGuard implements CanActivate {
    canActivate(context: ExecutionContext): any {
        let req = context.switchToHttp().getRequest();
        console.log('This is inside guard');
        return true;
    }
}