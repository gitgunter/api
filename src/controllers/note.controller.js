import noteService from '../services/note.service.js';

const getAllNotes = async (req, res) => {
  const userId = req.decodedUserId;
  const [result, error] = await noteService.getAllNotes(userId);

  if (error) {
    return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
  }

  if (result && result.length > 0) {
    return res.status(200).json({ success: true, data: result });
  } else {
    return res.status(200).json({ success: true, data: result });
  }
};

const createNote = async (req, res) => {
  const userId = req.decodedUserId;
  const noteData = req.body;

  const [result, error] = await noteService.createNote(noteData, userId);

  if (error) {
    return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
  }

  if (result.affectedRows > 0) {
    const insertId = result.insertId;

    return res.status(200).json({ success: true, id: insertId });
  }
};

const updateNote = async (req, res) => {
  const userId = req.decodedUserId;
  const updatedNoteData = req.body;

  const [result, error] = await noteService.updateNote(updatedNoteData, userId);

  if (error) {
    return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
  }

  if (result.affectedRows > 0) {
    const insertId = result.insertId;

    return res.status(200).json({ success: true, id: insertId });
  }
};

const deleteNote = async (req, res) => {
  const userId = req.decodedUserId;
  const noteId = req.params.id;

  const [result, error] = await noteService.deleteNote(noteId, userId);

  if (error) {
    return res.status(500).json({ success: false, message: 'Error interno en el servidor' });
  }

  if (result.affectedRows > 0) {
    return res.status(200).json({ success: true, message: 'Nota borrado' });
  } else {
    return res.status(404).json({ success: false, message: 'No se encontro una nota relacionado' });
  }
};

export default { getAllNotes, createNote, updateNote, deleteNote }