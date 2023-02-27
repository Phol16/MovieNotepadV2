import mongoose, { SchemaTypes } from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: SchemaTypes.String,
      default:'FirstName'
    },
    lastName: { 
      type: SchemaTypes.String,
      default:'LastName'
    },
    username: {
      type: SchemaTypes.String,
      required: [true, 'username is required'],
      unique: true,
    },
    password: {
      type: SchemaTypes.String,
      required: [true, 'password is required']
    },
    role:{
      type: SchemaTypes.String,
      required: [true, 'Must have a role']
    },
  },
  { timestamps: true }
);

const userModel = model('User', userSchema);
export default userModel;
