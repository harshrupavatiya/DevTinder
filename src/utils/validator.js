const validator = require("validator");

const validateSignedInData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName) {
    throw new Error("Enter a valid name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter valid Email id");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

const validateProfileEditData = (req) => {
  const editAllowedFields = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "gender",
    "skills",
  ];

  const isAllowed = Object.keys(req.body).every((field) =>
    editAllowedFields.includes(field)
  );

  return isAllowed;
};

module.exports = {
  validateSignedInData,
  validateProfileEditData,
};
