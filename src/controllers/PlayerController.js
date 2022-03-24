const { Op } = require("sequelize");
const playerModel = require("../models/Players");
const axios = require("axios");

const playerUrl = "https://www.balldontlie.io/api/v1/players?per_page=5";
const postUrl = "https://jsonplaceholder.typicode.com/posts";

async function createPlayers(request, response, next) {
  const posts = await getPosts();
  const players = await getPlayers();
  const newPlayers = constructPlayers(posts, players);
  //bulk create players table
  await playerModel.bulkCreate(newPlayers, {
    validate: true,
  });
  response.status(200).json({
    success: true,
    message: "Players has been successfully created",
    players: newPlayers,
    count: newPlayers.length,
  });
}
async function allPlayers(request, response, next) {
  // console.log(request.query)
  let players = [];
  if (request.query.name) {
    players = await playerModel.findAll({
      where: {
        name: {
          [Op.like]: `%${request.query?.name}%`,
        },
      },
    });
  } else {
    players = await playerModel.findAll();
  }
  response.status(200).json({
    success: true,
    message: "Players has been successfully fetched",
    players,
    count: players.length,
  });
}
async function getPosts() {
  try {
    const response = await axios.get(postUrl);
    let data = response.data;
    data = makePostUniqueByID(data);
    return data.slice(0, 5);
  } catch (error) {}
}

async function getPlayers() {
  try {
    const response = await axios.get(playerUrl);
    let data = response.data.data;
    return data;
  } catch (error) {
    console.log(error);
  }
}
function makePostUniqueByID(posts) {
  let data = posts;
  var unique = [];
  var distinct = [];
  for (let i = 0; i < data.length; i++) {
    if (!unique[data[i].userId]) {
      distinct.push({
        userId: data[i].userId,
        id: data[i].id,
        title: data[i].title,
        body: data[i].body,
      });
      unique[data[i].userId] = true;
    }
  }
  return distinct;
}
function constructPlayers(posts, players) {
  // console.log(posts.length);
  return posts.map((post, index) => ({
    user_id: post.userId,
    name: players[index].first_name,
    title: post.title,
    body: post.body,
  }));
}
const controllerMethods = {
  create: createPlayers,
  index: allPlayers,
};

module.exports = controllerMethods;
