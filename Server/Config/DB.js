const mongoose = require("mongoose")

mongoose.connect(
    "mongodb+srv://"
    + process.env.DB_USER_PASS +
    "@cluster0.iodcc.mongodb.net/Metalibaba-typescript"
)
.then(() => console.log("Connecté à MongoDB"))
.catch((err) => console.log("Echec lors de la connexion", err))