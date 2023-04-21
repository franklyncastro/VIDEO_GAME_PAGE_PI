require('dotenv').config()

const axios = require('axios').default;
const { Platform } = require('../db')

const {API_KEY} = process.env;

const getAllPlatforms = async () => {
    const storedPlatforms = await Platform.findAll()
    if(storedPlatforms.length){
        return storedPlatforms
    }

    const res = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`,{
        headers:{
            "Accept-Encoding" : "null"
        }
    })

    const results = res.data.results
    const platforms = new Set();
    
    results.forEach(game => {
        game.platforms.forEach(platform =>{
            platforms.add({
                id: platform.platform.id,
                name: platform.platform.name
            })
        })
    })
    const platformList = Array.from(platforms);

    await Platform.bulkCreate(platformList, { ignoreDuplicates: true });

    return platformList;
    
}

module.exports = getAllPlatforms;