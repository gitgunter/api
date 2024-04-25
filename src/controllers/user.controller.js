import userService from '../services/user.service.js';

const getUser = async (req, res) => {
  const userId = req.decodedUserId;

  const [result, error] = await userService.getUser(userId);

  if (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Error interno en el servidor' });
  }

  if (result && result.length > 0) {
    return res.status(200).json(result);
  } else {
    return res.status(404).json({ success: false, data: null });
  }
};

export default { getUser };
