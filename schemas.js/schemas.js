const signupSchema = {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
      rePassword: { type: "string" },
    },
    required: ["name", "email", "password", "rePassword"],
    additionalProperties: false
  }
  
  
  const loginSchema = {
    type: "object",
    properties: {
      email: { type: "string" },
      password: { type: "string" },
    },
    required: ["email", "password"],
    additionalProperties: false
  }
  
  module.exports = {signupSchema, loginSchema}