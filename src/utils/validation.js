export function checkValidData(name, email, password) {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);

  let errors = {
    email: null,
    password: null,
    name: null,
  };
  if (!isNameValid) errors.name = "Enter Valid Name";
  if (!isEmailValid) errors.email = "Email id is not valid";
  if (!isPasswordValid) errors.password = "Password is not valid";

  return errors;
}
