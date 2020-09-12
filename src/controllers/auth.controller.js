import User from "../models/User";
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from "../models/Role";

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

  const token = jwt.sign(
    {
      id: savedUser._id,
    },
    config.SECRET,
    {
      expiresIn: '1d',
    }
  );
  
  return response.status(200).json(token);
};

export const singIn = async (request, response) => {
  response.json('signin');
};