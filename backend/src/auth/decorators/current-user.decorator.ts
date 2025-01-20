import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log("CurrentUser Decorator - Request User:", request.user);
    const user = request.user;
    return {
      userId: user?.userId || user?.sub,
      email: user?.email,
    };
  }
);
