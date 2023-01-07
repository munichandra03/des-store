const jwt = require("jsonwebtoken");

function jwtgetSignToken(payload) {
  const secret =
    "THIS IS USED TO SIGN AND VERIFY JWT TOKENS REPLACE IT WITH YOUR OWN SECRET IT CAN BE ANY STRING";
  const token = jwt.sign(
    {
      sub: "dijfhgdijfgjkdfg",
      full: payload,
      isExternal: true,
      type: "GUEST",
    },
    secret
  );
  return {
    token,
  };
}
export default function handler(req, res) {
  const token = jwtgetSignToken(req.body);
  res.status(200).json(token);
}
