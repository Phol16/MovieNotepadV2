import mongoose, { SchemaTypes } from "mongoose";

const {Schema, model} = mongoose

const watchListSchema = new Schema ({
  movieId:{
    type:SchemaTypes.ObjectId,
    required:[true, 'Must have a movieId']
  },
  userId:{
    type:SchemaTypes.ObjectId,
    required:[true, 'Must have a UserId']
  },
  Notes:{
    type:SchemaTypes.Array,
  }
},{timestamps:true});

const watchListModel = model('WatchList', watchListSchema)
export default watchListModel