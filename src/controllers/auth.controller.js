import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authService from '../services/auth.service.js';

import { config } from 'dotenv';
config();

const loginEventLog = {
  email: '',
  status: ''
}

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const [result, error] = await authService.signIn(email);

  if (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Error interno en el servidor' });
  }

  if (result.length !== 1) {
    return res.status(401).send({ success: false, message: 'No se encontró un usuario registrado con este correo electrónico.' });
  }

  const user = result[0];
  const userId = user.id;
  const hashedPassword = user.password;

  try {
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
      loginEventLog.email = email;
      loginEventLog.status = 'Failed';

      console.log(`\nLogin Event\nEmail: ${loginEventLog.email}\nStatus: ${loginEventLog.status}`);

      return res.status(401).send({ success: false, message: 'La contraseña proporcionada es incorrecta.' });
    }

    // Generate user token
    const userToken = jwt.sign({ userId }, process.env.JWT_KEY, { expiresIn: '31d' });

    loginEventLog.email = email;
    loginEventLog.status = 'Success';

    console.log(`\nLogin Event\nEmail: ${loginEventLog.email}\nStatus: ${loginEventLog.status}`);

    return res.status(200).send({ success: true, message: 'Inicio de sesión exitoso!', userToken });
  } catch (error) {
    return res.status(500).json({ error: 'Error al comparar contraseñas.' });
  }
};

export default { signIn };
