import pool from '../config/db.config.js';

const getQuestions = async (limit) => {
  try {
    const getQuestionsQuery = 'SELECT * FROM questions ORDER BY RAND() LIMIT ?';
    const [result] = await pool.execute(getQuestionsQuery, [limit]);
    return [result, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const getBooleanQuestions = async (limit) => {
  try {
    const getBooleanQuestionsQuery = 'SELECT * FROM booleanQuestions ORDER BY RAND() LIMIT ?';
    const [result] = await pool.execute(getBooleanQuestionsQuery, [limit]);
    return [result, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const getAllExams = async (userId) => {
  try {
    const getAllExamsQuery = 'SELECT * FROM examenes WHERE userId = ?';
    const [result] = await pool.execute(getAllExamsQuery, [userId]);
    return [result, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const getExam = async (id, userId) => {
  try {
    const getExamQuery = 'SELECT * FROM examenes WHERE id = ? AND userId = ?';
    const [result] = await pool.execute(getExamQuery, [id, userId]);
    return [result, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const createExam = async (data, userId) => {
  try {
    const { name, status, questions, correctData, incorrectData, score } = data;

    const createExamQuery =
      'INSERT INTO examenes (`userId`, `name`, `status`, `questions`, `correctData`, `incorrectData`, `score`, `createdAt`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    const [result] = await pool.execute(createExamQuery, [
      userId,
      name,
      status,
      JSON.stringify(questions),
      JSON.stringify(correctData),
      JSON.stringify(incorrectData),
      score,
      'fecha',
    ]);
    return [result, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const deleteExam = async (id, userId) => {
  try {
    const deleteExamQuery = 'DELETE FROM examenes WHERE id = ? AND userId = ?';
    const [result] = await pool.execute(deleteExamQuery, [id, userId]);
    return [result, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export default { getQuestions, getBooleanQuestions, getAllExams, getExam, createExam, deleteExam };
