module.exports.singUpErrors = (error) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (error.message.includes("pseudo"))
    errors.pseudo = "Pseudo incorrect ou déjà pris";

  if (error.message.includes("email")) errors.email = "Email incorrect";

  if (error.message.includes("password"))
    errors.password = "Le mot de passe doit contenir au moins 6 caractères";

  if (error.code === 11000 && Object.keys(error.keyValue)[0].includes("pseudo"))
    errors.pseudo = "Ce pseudo est déjà pris";

  if (error.code === 11000 && Object.keys(error.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà enrégistré";

  return errors;
};

module.exports.singInErrors = (error) => {
  let errors = { email: "", password: "" };

  if (error.message.includes("email")) errors.email = "Email Incorrect";

  if (error.message.includes("password"))
    errors.password = "Mot de passe incorrect";

  return errors;
};

module.exports.uploadErrors = (error) => {
  let errors = { format: "", maxSize: "" };

  if (error.message.includes("invalid file"))
    errors.format = "format incompatible";

  if (error.message.includes("max size"))
    errors.format = "le fichier dépasse 500ko";

  return errors;
};
