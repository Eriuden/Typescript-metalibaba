const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
require("dotenv").config({path: "./config/.env"})
require("./Config/db")
const {checkUser, requireAuth} = require("./Middleware/auth.middleware")
const cors = require("cors")

const articleRoutes = require("./Routes/article.route")
const userRoutes = require("./Routes/user.route")

const app = express()

app.use(cors({origin: process.env.CLIENT_URL}))

const corsOptions = {
    origin : process.env.CLIENT_URL,
    credentials: true,
    "allowedHeaders" : ["sessionId", "content-type"],
    "exposedHeaders" : ["sessionId"],
    "methods" : "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue":false
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

app.get("*", checkUser)
app.get("jwtid", requireAuth, (res) => {
    res.statusCode(200).send(res.locals.user_id)
})

app.use("api/user", userRoutes)
app.use("api/article", articleRoutes)

app.listen(process.env.PORT, () => {
    console.log(`La scène est en place au port ${process.env.PORT}`)
})