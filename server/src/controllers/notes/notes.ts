import express, { Request, Response } from 'express';
import { createNotes, deleteNotes, getNotesById, updateNotes } from './notesControllers';
import { get } from 'lodash';


export const fetchAllNotes = async (req: Request, res: Response) => {
  try {
    const  id  = req.query.id as string;
    const userId = get(req, 'identity._id')

      const findNotes = await getNotesById(id, userId);

      if (!findNotes.length) {
        return res.status(404).json({ message: 'No notes in db' });
      }

      res.status(200).json({ data: findNotes, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const addNotes = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const { id } = req.query;
    const userId = get(req, 'identity._id')

    if (!title && !content) {
      return res.status(404).json({ message: 'Input details missing' });
    }
    const notesData = { title, content, watchListID: id, userId };

    const newNotes = await createNotes(notesData);

    res.status(200).json({ data: newNotes, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateANote = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const  id  = req.query.id as string;

    if (!title && !content) {
      return res.status(404).json({ message: 'Input details missing' });
    }
    const notesData = { title, content };

      const updatedNote = await updateNotes(id, notesData);

      res.status(200).json({ data: notesData, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteANote = async (req: Request, res: Response) => {
  try {
    const  id  = req.query.id as string;

      const deletedNote = await deleteNotes(id);

      res.status(200).json({ data: deletedNote, message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
