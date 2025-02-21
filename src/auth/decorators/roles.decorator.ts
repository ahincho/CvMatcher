import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Roles = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    if (user && user.roles) {
      return user.roles.map((role) =>
        typeof role === 'object' ? role.name : role,
      );
    }
    return [];
  },
);
