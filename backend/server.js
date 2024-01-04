const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require('cors');
const FormData = require('form-data');
const mongoose = require('mongoose');
const itemModel = require('./Model');
const cloudinary = require("cloudinary").v2;
const path = require("path");



const { upload, fileSizeFormatter } = require("./fileUpload");

const app = express();
const port = 3001;


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const MONGO_URI = "mongodb+srv://main:uRuyvsAJ07IjrFlK@wardrobe.dwsjcwl.mongodb.net/?retryWrites=true&w=majority";


cloudinary.config({
  cloud_name : "dlplwebnw",
  api_key : "227331452716381",
  api_secret : "E497tkN9GgmRVES6O6xiv8k1g1w"
})


// #region Endpoints
app.use(bodyParser.json());

app.use(cors({
    origin: '*'
}));


app.post("/items/upload", upload.single("file"), async (req, res) => {
  const {name} = req.body;

  if (!name) 
  {
    res.status(400);
    console.log("sa manque name");
  }


  let fileData = {};
  if (req.file)
  {

    console.log("le fichier est ici")
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder : "Digital Closet",
        resource_type: "image",
      });
    } catch (error) {
      res.status(500);
      throw new Error("Image could not be loaded");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    }

  }

  

  const item = await itemModel.create({
    name : name,
    image : fileData
  });

  res.status(201).json({"message" : "Item created successfully"});
  console.log("un item a ete ajoute avec success");
  console.log(fileData);

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


app.post("/recommend", async (req, res) => {
  
  const {temperature} = req.body;

  let disponibleRaw = await itemModel.find({});
  let disponible = disponibleRaw.map(
    (obj) => {
      return obj.name;
    }
  ) 

  

  const resultatRaw = await axios.post("http://suggest.pythonanywhere.com/recommend", {
    temperature : temperature,
    disponible : disponible
  });

  const resultat = resultatRaw.data;

  let resultatTop = resultat.top;
  let resultatBot = resultat.bot;
  let resultatShoe = resultat.shoes;
  let resultatHat = resultat.hat;
  let resultatAccessorie = resultat.accessorie;
  
  

  let tops = await itemModel.find({name:resultatTop});
  let bots = await itemModel.find({name:resultatBot});
  let shoes = await itemModel.find({name:resultatShoe});
  let hats = await itemModel.find({name:resultatHat});
  let accessories = await itemModel.find({name:resultatAccessorie});

  const enfin = {
    top : getRandomElement(tops),
    bot : getRandomElement(bots),
    shoe : getRandomElement(shoes),
    hat : getRandomElement(hats),
    accessorie : getRandomElement(accessories)
  }



  res.status(201).json(enfin);

}) 

function getRandomElement(list) {
  if (list.length === 0) {
    return {name :"Nothing", image : {filePath : "https://cdn-icons-png.flaticon.com/512/5084/5084126.png"}}; 
  }

  const randomIndex = Math.floor(Math.random() * list.length);

  return list[randomIndex];
}




mongoose
  .connect(MONGO_URI)
  .then (() => {
    app.listen(port, () => {
      console.log("Le serveur il court");
    })
  }
  )
  .catch((err) => console.log(err));