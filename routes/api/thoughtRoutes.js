const router = require("express").Router();
const {
  postThought,
  getThoughts,
  deleteThought,
  getSingleThought,
  updateThought,
  addReaction,
  deleteReaction
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts);
router.route("/:thoughtId").get(getSingleThought).delete(deleteThought).put(updateThought);
router.route("/:userId").post(postThought)
router.route("/:thoughtId/reactions").post(addReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);
module.exports = router;
