import pool from '../config/db.config.js';
import getCurrentDate from '../utils/getCurrentDate.js';

const getAllNotes = async (userId) => {
  try {
    const getAllNotesQuery = 'SELECT * FROM notes WHERE userId = ?';
    const [result] = await pool.execute(getAllNotesQuery, [userId]);
    return [result, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const createNote = async (data, userId) => {
  try {
    const { emoji, title, content } = data;
    const noteCreatedAt = getCurrentDate();

    const createNoteQuery =
      'INSERT INTO notes (`emoji`, `title`, `content`, `createdAt`, `userId`) VALUES (?, ?, ?, ?, ?)';

    const [result] = await pool.execute(createNoteQuery, [
      emoji,
      title,
      content,
      noteCreatedAt,
      userId,
    ]);
    return [result, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const updateNote = async (data, userId) => {
  try {
    const { id, emoji, title, content } = data;

    const updateNoteQuery =
      'UPDATE notes SET emoji = ?, title = ?, content = ?, userId = ? WHERE id = ?';

    const [result] = await pool.execute(updateNoteQuery, [
      emoji,
      title,
      content,
      userId,
      id,
    ]);
    return [result, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const deleteNote = async (id, userId) => {
  try {
    const deleteNoteQuery = 'DELETE FROM notes WHERE id = ? AND userId = ?';
    const [result] = await pool.execute(deleteNoteQuery, [id, userId]);
    return [result, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export default { getAllNotes, createNote, updateNote, deleteNote };
