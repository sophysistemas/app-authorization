import User from "../models/User";

export const singUp = async (request, response) => {
  response.json('signup');
};

export const singIn = async (request, response) => {
  response.json('signin');
};