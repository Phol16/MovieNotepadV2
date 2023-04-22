import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const noteSchema = new Schema(
  {
    content: { type: SchemaTypes.String, default: 'No content' },
    title: { type: SchemaTypes.String, default: 'No Title' },
    watchListID: { type: SchemaTypes.ObjectId, required: ['must have watchList ID'], ref: 'WatchList' },
    userId:{type:SchemaTypes.ObjectId, requied:['must have userId'], ref:'User'},
    deletedAt: { type: SchemaTypes.Date, default: null },
  },
  { timestamps: true }
);

const notesModel = model('Notes', noteSchema);
export default notesModel;
