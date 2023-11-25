const axios = require("axios");
const {Dogs} = require("../db");

const cleanTemperaments = (arr)=>{
    return arr.map((temperament)=>{
    return{
        temperamentos:temperament.temperament
    };
    });
  };  

const getTemperamentsByName = async()=>{
    const allTeams = await Dogs.findAll();
  const infoApi = (await axios.get("https://api.thedogapi.com/v1/breeds/"))
    .data;
    const allTemperamentsApi = cleanTemperaments(infoApi)
    return [...allTeams, ...allTemperamentsApi];
}
module.exports = {getTemperamentsByName};