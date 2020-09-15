import User from "../models/User";
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from "../models/Role";

// Create User
export const singUp = async (request, response) => {
  const { username, email, password, roles } = request.body; 

  const passwordHashed = await User.encryptPassword(password);

  const user = new User({
    username,
    email,
    password: passwordHashed,
  });

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles }});
    user.roles = foundRoles.map(role => role._id);
  } else {
    const role = await Role.findOne({ name: 'user' });
    user.roles = [role._id];
  }

  const savedUser = await user.save();

  const { secret, expiresIn } = config.jwt;

  const token = jwt.sign({ id: savedUser._id }, secret, {
    expiresIn,
  });
  
  return response.status(200).json(token);
};

// Login User
export const singIn = async (request, response) => {

  const { email, password } = request.body;
  
  const user = await (User.findOne({ email })).populate('roles');

  if (!user) {
    return response.status(400).json({ message: 'User not found' });
  }

  // Validate password
  const matchPassword = await User.comparePassword(password, user.password);

  if(!matchPassword) {
    return response.status(401).json({ message: 'Incorrect user/password' });
  }
  
  const { secret, expiresIn } = config.jwt;

  const token = jwt.sign({ id: user._id}, secret, {
    expiresIn,
  });

  return response.json({ token });
};