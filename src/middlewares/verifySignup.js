import { ROLES } from '../models/Role';
import User from '../models/User';

export const checkDuplicateUsernameOrEmail = async (request, response, next) => {
  const { username, email } = request.body;

  //Valida usuario
  const checkUserName = await User.findOne({ username });

  if (checkUserName) {
    return response.status(400).json({ message: 'Usuário já existe'});
  }

  // Valida email
  const checkEmail = await User.findOne({ email });

  if (checkEmail) {
    return response.status(400).json({ message: 'E-mail já existe'});
  }

  return next();
}

export const checkRoleExisted = (request, response, next) => {
  const { roles } = request.body;

  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!ROLES.includes(roles[i])) {
        return response.status(400).json({ message: `Role ${roles[i]} não existe` });
      }
    }
  }
  return next();
}