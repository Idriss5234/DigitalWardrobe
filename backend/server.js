const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require('cors');
const FormData = require('form-data');
const mongoose = require('mongoose');
const itemModel = require('./Model');

const app = express();
const port = 3001;

const MONGO_URI = "mongodb+srv://main:uRuyvsAJ07IjrFlK@wardrobe.dwsjcwl.mongodb.net/?retryWrites=true&w=majority";


// #region Endpoints
app.use(bodyParser.json());

app.use(cors({
    origin: '*'
}));


app.post("/items/upload", async (req, res) => {
  const {name, ImageSrc} = req.body;

  if (!name) 
  {
    res.status(400);
    console.log("sa manque name");
  }


  if (!ImageSrc) 
  {
    res.status(400);
   console.log("sa manque source");
  }

  

  const item = await itemModel.create({
    name,
    ImageSrc
  });

  res.status(201).json(item);
  console.log("un item a ete ajoute avec success");

});

app.get("/items/fetch", async (req, res) => {

  const items = await itemModel.find({});

  
  res.status(200).json(items);  
})



app.post("/upload-to-imgbb", async (req, res) => {

    const apiUrl = 'https://api.imgbb.com/1/upload';
    const expiration = 600;
    const clientApiKey = "166c52644f15e1b99a841a0375fb7667";
    const formData = new FormData();

    formData.append('image', req.body.image);

    try {
        const response = await axios.post(`${apiUrl}?expiration=${expiration}&key=${clientApiKey}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        res.status(200).json( response.data);
      } catch (error) {
        throw error;
      }
    })

//#endregion



mongoose
  .connect(MONGO_URI)
  .then (() => {
    app.listen(port, () => {
      console.log("Le serveur il court");
    })
  }
  )
  .catch((err) => console.log(err));