import pool from '../config/db.config.js';

const signIn = async (email) => {
  try {
    const signInQuery = 'SELECT * FROM `users` WHERE `email` = ?';

    const [result] = await pool.execute(signInQuery, [email]);
    return [result, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export default { signIn };
