import mongoose, { SchemaTypes } from 'mongoose';

const { Schema, model } = mongoose;

const movieSchema = new Schema(
  {
    authorId: {
      type: SchemaTypes.ObjectId,
      required: [true, 'Must have Publisher'],
    },
    title: {
      type: SchemaTypes.String,
      required: [true, 'Must have Title'],
    },
    image: {
      type: SchemaTypes.String,
      required: [true, 'Must have Poster'],
    },
    year: {
      type: SchemaTypes.Array,
      required: [true, 'Must have Year'],
    },
    genre: {
      type: SchemaTypes.Array,
      required: [true, 'Must have Genre'],
    },
    description: {
      type: SchemaTypes.String,
      default:'Description'
    },
    imdbId: {
      type: SchemaTypes.String,
      default: 'unkown',
    },
    deletedAt: {
      type: SchemaTypes.Date,
      default: null,
    },
    like: {
      type: SchemaTypes.Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const movieModel = model('Movie', movieSchema);
export default movieModel;
