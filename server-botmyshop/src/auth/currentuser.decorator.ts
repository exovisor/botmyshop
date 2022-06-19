import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
export const CurrentUser = createParamDecorator(
  (data: string, context: GqlExecutionContext) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [root, args, ctx, info] = context.getArgs();
    const req = ctx.req;
    const user = req.user;

    if (data) {
      return user?.[data];
    }

    return user;
  },
);
