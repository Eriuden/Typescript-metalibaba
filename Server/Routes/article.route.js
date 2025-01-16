const router = require("express").Router()
const articleController = require("../Controllers/article.controller")
const uploadController = require("../Controllers/upload.controller")
const multer = require("multer")
const upload = multer()

router.get("/", articleController.readArticle)
router.put("/:id", articleController.updateArticle)
router.delete("/:id", articleController.deleteArticle)
router.post("/", upload.single("file", articleController.createArticle))
router.post("/upload-articlePic", upload.single("file"), uploadController.uploadArticlePic)
router.patch("/like-article/:id", articleController.likeArticle)
router.patch("/dislike-article/:id", articleController.dislikeArticle)
router.patch("/unlike-article/:id", articleController.unlikeArticle)
router.patch("/undislike-article/:id", articleController.undislikeArticle)

router.patch("/comment-article/:id", articleController.commentArticle)
router.patch("/edit-comment-article/:id", articleController.editCommentArticle)
router.patch("/delete-comment-article/:id", articleController.deleteCommentArticle)

module.exports = router