import pool from '../config/db.config.js';

const getUser = async (userId) => {
  try {
    const getUserQuery = 'SELECT * FROM `users` WHERE `id` = ?';
    const [result] = await pool.execute(getUserQuery, [userId]);
    return [result, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const updateUser = async () => {};
const deleteUser = async () => {};

export default { getUser };
