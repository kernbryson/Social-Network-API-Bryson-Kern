const connection = require("../config/connection");
const { User } = require("../models");
const { formattedUsers } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});

  console.log(formattedUsers);

  await User.insertMany(formattedUsers);

  console.table(formattedUsers);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
