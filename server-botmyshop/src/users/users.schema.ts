import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { compareSync, hashSync } from 'bcryptjs';
import { Document, Types } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class User {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => String)
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Field(() => GraphQLISODateTime)
  @Prop(Date)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  @Prop(Date)
  updatedAt: Date;
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = hashSync(this.password);
  next();
});

UserSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, compareSync(plaintext, this.password));
};
