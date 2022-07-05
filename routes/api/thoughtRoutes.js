const router = require("express").Router();
const {
  postThought,
  getThoughts,
  deleteThought,
  getSingleThought,
  updateThought,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts);
router.route("/:thoughtId").get(getSingleThought).delete(deleteThought).put(updateThought);
router.route("/:userId").post(postThought)
module.exports = router;
