
import User from "../models/User";
import singUp from './auth.controller';

// List Users
export const getUsers = async (request, response) => {
  const users = await User.find();

  response.status(200).json(users);
};

export const createUser = ( request, response) => {
  
  return response.json({ message: 'Create User'});
  
};

// Delete user
export const deleteUserById = async (request, response) => {
  const { user_id } = request.params;
  console.log(user_id);
  const user = await User.findByIdAndDelete(user_id);

  return response.json( { OK: 'Usuário eliminado' });
};