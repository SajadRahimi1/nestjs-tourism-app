import { Injectable,NestMiddleware,ExecutionContext,CallHandler,NestInterceptor} from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { Observable } from 'rxjs';
import { TokenService } from 'src/user/token.service';

@Injectable()
export class TokenHeaderInceptor implements NestInterceptor {
constructor(private httpService: HttpService,private tokenService:TokenService){};
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const token = ctx.getRequest().headers.authorization;
    if(token){
        ctx.getRequest().headers.user = await this.tokenService.getUser(token.split(' ')[1]);        
        
    }
    return next.handle().pipe();
}
}

