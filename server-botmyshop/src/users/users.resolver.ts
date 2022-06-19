import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { CreateUserInput, FindUserInput, UpdateUserInput } from './users.input';
import { User } from './users.schema';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  async getUserById(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return this.usersService.findById(_id);
  }

  @Query(() => User)
  async getUser(@Args('payload') payload: FindUserInput) {
    return this.usersService.findOne(payload);
  }

  @Mutation(() => User)
  async createUser(@Args('payload') payload: CreateUserInput) {
    return this.usersService.create(payload);
  }

  @Mutation(() => User)
  async updateUser(@Args('payload') payload: UpdateUserInput) {
    return this.usersService.update(payload);
  }

  @Mutation(() => User)
  async deleteUser(@Args('_id', { type: () => String }) _id: Types.ObjectId) {
    return this.usersService.delete(_id);
  }
}
