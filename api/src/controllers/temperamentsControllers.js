const axios = require("axios");
const { Dogs } = require("../db");

const cleanTemperaments = (arr) => {
  return arr.map((temperaments) => {
    return {
      temperamentos: temperaments.temperament
        ? temperaments.temperament.split(",").map((t) => t.trim())
        : [],
    };
  });
};

const getTemperamentsByName = async () => {
  try {
    const allTemperamentsLocal = await Dogs.findAll();
    const infoApi = (await axios.get("https://api.thedogapi.com/v1/breeds"))
      .data;
    const allTemperamentsApi = cleanTemperaments(infoApi);
    const combinedTemperaments = [
      ...allTemperamentsLocal,
      ...allTemperamentsApi,
    ];

    return combinedTemperaments;
  } catch (error) {
    console.error("Error fetching temperaments:", error.message);
    throw error;
  }
};

module.exports = { getTemperamentsByName };
