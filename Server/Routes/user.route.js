const router = require("express").Router()
const authController = require("../Controllers/auth.controller")
const userController = require("../Controllers/user.controller")
const uploadController = require("../Controllers/upload.controller")
const multer = require("multer")
const upload = multer()

router.post("/register", authController.signUp)
router.post("/login", authController.signIn)
router.post("/resetPasswordLink", authController.resetPasswordLink)
router.post("/updatePassword/:id/token", authController.updatePassword)
router.post("/upload-userPic",upload.single("file"),uploadController.uploadProfil)

router.get("/logout", authController.logout)
router.get("forgotPasswordChecking/:id/token", authController.forgotPasswordChecking)

router.get("/", userController.getAllUsers)
router.get("/:id", userController.getUser)
router.put("/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser)

module.exports = router