const loginSchema = {
  type: "object",
  properties: {
    password: { type: "string" },
    email: { type: "string", pattern: "[@]+" },
  },
  required: ["password", "email"],
  additionalProperties: false,
};
const signupSchema = {
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    password: { type: "string" },
    rePassword: { type: "string" },
    email: { type: "string", pattern: "[@]+" },
  },
  required: ["firstName", "lastName", "password", "rePassword", "email"],
  additionalProperties: true,
};
module.exports = { loginSchema, signupSchema };
