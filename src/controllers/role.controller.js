import Role from "../models/Role";

// List Roles
export const getRoles = async (request, response) => {
  const roles = await Role.find();

  response.status(200).json(roles);
}