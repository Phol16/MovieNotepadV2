import Notes from '../../db/NoteModel';

export const getNotesById = (id: string, userId:string) => Notes.find({ watchListID: id, userId, deletedAt: null });
export const createNotes = (values: Record<string, any>) => new Notes(values).save();
export const deleteNotes = (id: string) => Notes.findByIdAndUpdate(id, { deletedAt: Date.now() });
export const updateNotes = (id: string, values: Record<string, any>) => Notes.findByIdAndUpdate(id, values);
