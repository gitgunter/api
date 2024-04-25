import examService from '../services/exam.service.js';

const getQuestions = async (req, res) => {
  const limit = req.params.limit;

  const [result, error] = await examService.getQuestions(limit);

  if (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Error interno en el servidor' });
  }

  if (result && result.length > 0) {
    return res.status(200).json({ success: true, data: result });
  } else {
    return res.status(200).json({ success: true, data: result });
  }
};

const getBooleanQuestions = async (req, res) => {
  const limit = req.params.limit;

  const [result, error] = await examService.getBooleanQuestions(limit);

  if (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Error interno en el servidor' });
  }

  if (result && result.length > 0) {
    return res.status(200).json({ success: true, data: result });
  } else {
    return res.status(200).json({ success: true, data: result });
  }
};

const getAllExams = async (req, res) => {
  const userId = req.decodedUserId;

  const [result, error] = await examService.getAllExams(userId);

  if (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Error interno en el servidor' });
  }

  if (result && result.length > 0) {
    return res.status(200).json({ success: true, data: result });
  } else {
    return res.status(200).json({ success: true, data: result });
  }
};

const getExam = async (req, res) => {
  const userId = req.decodedUserId;
  const examId = req.params.id;

  const [result, error] = await examService.getExam(examId, userId);

  if (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Error interno en el servidor' });
  }

  if (result && result.length > 0) {
    return res.status(200).json({ success: true, data: result });
  } else {
    return res.status(404).json({ success: false, data: null });
  }
};

const createExam = async (req, res) => {
  const userId = req.decodedUserId;
  const examData = req.body;

  const [result, error] = await examService.createExam(examData, userId);

  if (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Error interno en el servidor' });
  }

  if (result.affectedRows > 0) {
    const examId = result.insertId;

    const [examResult, error] = await examService.getExam(examId, userId);

    if (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Error interno en el servidor' });
    }

    if (examResult && examResult.length > 0) {
      return res.status(200).json({ success: true, data: examResult });
    } else {
      return res.status(404).json({ success: false, data: null });
    }
  }
};

const deleteExam = async (req, res) => {
  const userId = req.decodedUserId;
  const examId = req.params.id;

  const [result, error] = await examService.deleteExam(examId, userId);

  if (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Error interno en el servidor' });
  }

  if (result.affectedRows > 0) {
    return res.status(200).json({ success: true, message: 'Examen borrado' });
  } else {
    return res
      .status(404)
      .json({
        success: false,
        message: 'No se encontro un examen relacionado',
      });
  }
};

export default {
  getQuestions,
  getBooleanQuestions,
  getAllExams,
  getExam,
  createExam,
  deleteExam,
};
