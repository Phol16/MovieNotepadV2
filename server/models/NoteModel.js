import mongoose, { SchemaTypes } from 'mongoose';

const { Schema, model } = mongoose;

const noteSchema = new Schema(
  {
    title: {
      type: SchemaTypes.String,
      default: 'No Title Added',
    },
    content: {
      type: SchemaTypes.String,
      default: 'No Content Added',
    },
    authorId: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: [true, 'Must have publisher'],
    },
    movieId:{
      type:SchemaTypes.ObjectId,
      ref:'Movie',
      required:[true, 'Must have MovieId']
    },
    deletedAt:{
      type:SchemaTypes.Date,
      default:null
    }
  },
  { timestamps: true }
);

const noteModel = model('Note', noteSchema);
export default noteModel;
