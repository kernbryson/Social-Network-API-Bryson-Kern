const users = [
  "mooshroomhopeless",
  "miserablebobcat",
  "purrmiss",
  "reconditeexpel",
  "discoverycarve",
  "arrogantachoo",
  "yourcrepe",
  "strutworkshop",
  "stockingchile",
  "warngrowl",
  "greydeltas",
  "unikern",
  "retireoctopus",
  "silentalmost",
];

const email = [
  "Cynthia_Brennan8762@hourpy.biz",
  "Dakota_Dubois3562@twipet.com",
  "Kurt_Thatcher6738@deons.tech",
  "Adalie_Drummond5318@ovock.tech",
  "Hank_Rivers8160@bretoux.com",
  "Nick_Sylvester5646@acrit.org",
  "Chadwick_Rose1510@extex.org",
  "Rowan_Pond3765@elnee.tech",
  "Gabriel_Pearce7896@liret.org",
  "Jayden_Price1999@twipet.com",
  "Adeline_Ianson7465@irrepsy.com",
  "Gil_Morrow9448@bauros.biz",
  "Manuel_Coleman7961@acrit.org",
  "Elijah_Yarwood6264@irrepsy.com",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
function nameAndEmail() {
  let userArray = [];
  for (let i = 0; i < users.length; i++) {
    let userObject = {
      username: users[i],
      email: email[i],
    };
    userArray.push(userObject);
  }
  console.log(userArray);
  return userArray;
}
nameAndEmail();
const formattedUsers = nameAndEmail()
// Gets a random full name
const getRandomName = () => `${getRandomArrItem(users)}`;

// Function to generate random assignments that we can add to student object.
const getRandomAssignments = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      assignmentName: getRandomArrItem(appDescriptions),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { formattedUsers,  };
