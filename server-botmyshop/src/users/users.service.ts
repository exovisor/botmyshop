import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { genSalt, hash } from 'bcryptjs';
import { Model, Types } from 'mongoose';
import { CreateUserInput, FindUserInput, UpdateUserInput } from './users.input';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(payload: CreateUserInput): Promise<User> {
    const createdPerson = new this.userModel(payload);
    return createdPerson.save();
  }

  async findById(_id: Types.ObjectId) {
    return this.userModel.findById(_id).exec();
  }

  async findOne(filters: FindUserInput) {
    return this.userModel.findOne({ ...filters });
  }

  async update(payload: UpdateUserInput) {
    if (payload.password) {
      const salt = await genSalt();
      payload.password = await hash(payload.password, salt);
    }

    return this.userModel
      .findByIdAndUpdate(payload._id, payload, { new: true })
      .exec();
  }

  async delete(_id: Types.ObjectId) {
    return this.userModel.findByIdAndDelete(_id).exec();
  }
}
