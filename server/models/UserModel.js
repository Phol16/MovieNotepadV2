import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: { 
      type: String 
    },
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required']
    },
    role:{
      type: String,
      required: [true, 'Must have a role']
    },
  },
  { timestamps: true }
);

const userModel = model('User', userSchema);
export default userModel;
