import pool from '../config/db.config.js';

const getAllQuickTests = async (userId) => {
  try {
    const getAllQuickTestsQuery = 'SELECT * FROM quick_test WHERE userId = ?';
    const [result] = await pool.execute(getAllQuickTestsQuery, [userId]);
    return [result, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const getQuickTest = async (id, userId) => {
  try {
    const getQuickTestQuery = 'SELECT * FROM quick_test WHERE id = ? AND userId = ?';
    const [result] = await pool.execute(getQuickTestQuery, [id, userId]);
    return [result, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const createQuickTest = async (data, userId) => {
  try {
    const { name, status, questions, correctData, incorrectData, score } = data;

    const createQuickTestQuery =
      'INSERT INTO quick_test (`userId`, `name`, `status`, `questions`, `correctData`, `incorrectData`, `score`, `createdAt`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    const [result] = await pool.execute(createQuickTestQuery, [
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

const deleteQuickTest = async (id, userId) => {
  try {
    const deleteQuickTestQuery = 'DELETE FROM quick_test WHERE id = ? AND userId = ?';
    const [result] = await pool.execute(deleteQuickTestQuery, [id, userId]);
    return [result, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export default { getAllQuickTests, getQuickTest, createQuickTest, deleteQuickTest };