import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

export class UserCtx {
  _id: string;

  username: string;
}

@ArgsType()
export class LoginArgs {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class AccessToken {
  @Field()
  access_token: string;
}
