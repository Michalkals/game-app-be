const signupSchema = {
    type: "object",
    properties: {
      nickname: { type: "string" },
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string" },
      password: { type: "string" },
      rePassword: { type: "string" },
    },
    required: ["firstName","lastName", "email", "password", "rePassword"],
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