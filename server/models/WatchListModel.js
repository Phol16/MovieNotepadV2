import mongoose, { SchemaTypes } from "mongoose";

const {Schema, model} = mongoose

const watchListSchema = new Schema ({
  movieId:{
    type:SchemaTypes.ObjectId,
    ref:'Movie',
    required:[true, 'Must have a movieId']
  },
  userId:{
    type:SchemaTypes.ObjectId,
    ref:'User',
    required:[true, 'Must have a UserId']
  },
  Notes:{
    type:SchemaTypes.Array,
    default:'No notes yet'
  },
  deletedAt:{
    type:SchemaTypes.Date,
    default: null
  }
},{timestamps:true});

const watchListModel = model('WatchList', watchListSchema)
export default watchListModel