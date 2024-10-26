module.exports.signUpErrors = (err) => {
    let errors = {name: "", email:"", password:""}

    if (err.message.includes("name"))
    errors.name = "Nom incorrect"

    if (err.message.includes("email"))
    errors.email = "Email incorrect"

    if (err.message.includes("password"))
    errors.password = "Mot de passe incorrect"

    if (err.code === 11000 & Object.keys(err.keyValue)[0].includes("name"))
        errors.name = "Ce nom est déjà pris"

    if (err.code === 11000 & Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "Cette adresse mail est déjà prise"
    
    return errors
}

module.exports.signInErrors = (err) => {
    let errors = {email:"", password: ""}

    if(err.message.includes("email"))
        errors.email = "Email inconnu"
    
    if(err.message.includes("password"))
        errors.password = "Mot de passe inconnu"
}

module.exports.uploadErrors = (err) => {
    let errors = {format:"", maxSize:""}

    if (err.message.includes("invalid file"))
    errors.format = "Format de fichier invalide"

    if (err.message.includes("Max size"))
    errors.format = "Taille maximale de fichiers dépassée"
}