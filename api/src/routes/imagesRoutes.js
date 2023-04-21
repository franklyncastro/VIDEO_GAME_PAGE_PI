const express = require("express");
const path = require('path');


const imageRouter = express.Router()

imageRouter.get('/:filename', async (req, res) => {
    try{
        const filename = req.params.filename;
    const imagePath = path.join(__dirname, 'public', 'images', filename);
    console.log(imagePath)
    res.sendFile(imagePath);
}catch (error) {
    console.log(error)
}
  });