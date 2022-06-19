import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccessToken, LoginArgs } from './auth.dto';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AccessToken, { nullable: true })
  async login(@Args() args: LoginArgs): Promise<AccessToken> {
    const token = await this.authService.login(args.username, args.password);
    return token;
  }
}
