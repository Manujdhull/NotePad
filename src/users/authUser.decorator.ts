import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext):any => {
    const request: any = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
