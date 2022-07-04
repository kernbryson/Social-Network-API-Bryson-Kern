const router = require("express").Router();
const {
  postThought,
  getThoughts,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(postThought);
module.exports = router;