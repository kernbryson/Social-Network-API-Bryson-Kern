const connection = require("../config/connection");
const { Course, User } = require("../models");
const { formattedUsers } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing courses
  await Course.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the users
  const users = [];
  console.log(formattedUsers);
  // Loop 20 times -- add users to the users array

  await User.insertMany(formattedUsers);

  // Add courses to the collection and await the results
  // await Course.collection.insertOne({
  //   courseName: "UCLA",
  //   inPerson: false,
  //   users: [...users],
  // });

  // Log out the seed data to indicate what should appear in the database
  console.table(formattedUsers);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
