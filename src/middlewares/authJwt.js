import { verify } from 'jsonwebtoken';
import jwtConfig from '../config';
import User from '../models/User';
import Role from '../models/Role';

export const verifyToken = async (request, response, next) => {
  
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    return response.status(403).json({ message: 'JWT token ausente'});
  }

  const [, token] = authHeader.split(' ');

  try {
      // validate token
      const decoded = verify(token, jwtConfig.jwt.secret);
      request.userId = decoded.id;
      // validate user
      const { id } = decoded;
      
      const checkUserExists = await User.findById(id, { password: 0 }); //return the user without password
      
      if (!checkUserExists) {
        return response.status(404).json({ message: 'Usuário não encontrado'});
      }

      return next();
  } catch {
    return response.json({ message: 'JWT token inválido'});
  }  
}

export const isModerator = async (request, response, next) => { 
  const user = await User.findById(request.userId);
  const roles = await Role.find({ _id: { $in: user.roles }});

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'moderator') {
      next();
      return;
    }
  }
  return response.status(403).json({ message: 'Requer permissão de moderador' });
};

export const isAdmin = async (request, response, next) => {
  const user = await User.findById(request.userId);
  const roles = await Role.find({ _id: { $in: user.roles }});

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === 'admin') {
      next();
      return;
    }
  }
  return response.status(403).json({ message: 'Requer permissão de administrador' });
};
