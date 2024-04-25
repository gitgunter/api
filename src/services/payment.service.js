import pool from '../config/db.config.js';

const createOrder = async (order) => {
  const { order_number, total, status, payment_status, user_email, user_name } =
    order;

  try {
    // const createOrderQuery = 'INSERT INTO lemon_squeezy_orders (`product_id`, ` total_price`, `order_status`, `createdAt`, `userId`) VALUES (?, ?, ?, ?, ?)';
    const createOrderQuery =
      'INSERT INTO lemon_squeezy_orders (product_id, total_price, order_status, payment_status, user_email, user_name) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await pool.execute(createOrderQuery, [
      order_number,
      total,
      status,
      payment_status,
      user_email,
      user_name,
    ]);
    return [result, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export default { createOrder };
