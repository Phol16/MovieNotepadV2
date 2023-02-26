import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const movieSchema = new Schema(
  {
    authorId:{
      type: String,
      required:[true, 'Must have Publisher']
    },
    title:{
      type: String,
      required:[true, 'Must have Title']
    },
    image:{
      type: String,
      required:[true, 'Must have Poster']
    },
    year:{
      type:Array,
      required:[true, 'Must have Year']
    },
    genre:{
      type:Array,
      required:[true, 'Must have Genre']
    },
    description:{
      type:String,
    },
    imdbId:{
      type: String,
      default: 'unkown'
    },
    deletedAt:{
      type:Date,
      default:null
    },
    like:{
      type:Number,
      default: 0,
    }
  },
  { timestamps: true }
);

const movieModel = model('Movie', movieSchema);
export default movieModel;
