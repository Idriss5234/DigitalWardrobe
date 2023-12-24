import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Button from "@mui/material/Button";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import "./Detection.css";

const Detection = () => {
  const saveToDatabase = async (stuff, src) => {
    // stuff is the list of items names
    for (let i = 0; i < stuff.length; i++) {
      console.log(stuff[i]);
      await axios.post("https://digitward.onrender.com/items/upload", {
        name: stuff[i],
        ImageSource: src,
      });
    }
  };

  const navigate = useNavigate();

  const redirectToInventory = () => {
    navigate("/inventory");
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    const img64 = imageSrc.split(",")[1];
    setimg64(img64);
  };

  const USER_ID = "clarifai";
  const PAT = "ad6f30af4ff849eb8928e9b66de30c50";
  const APP_ID = "main";
  const MODEL_ID = "apparel-classification-v2";
  const MODEL_VERSION_ID = "651c5412d53c408fa3b4fe3dcc060be7";
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [img64, setimg64] = useState(null);

  const uploadImageToTempStorage = async (base64Image) => {
    try {
      const response = await axios.post(
        "https://digitward.onrender.com/upload-to-imgbb",
        {
          image: base64Image,
        }
      );

      if (response.data.data && response.data.data.url) {
        return response.data.data.url;
      } else {
        throw new Error("Failed to upload image to temporary storage.");
      }
    } catch (error) {
      console.error("Error uploading image:", error.message);
      throw error;
    }
  };

  const uploadMiddleware = async (imageURL) => {
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: imageURL,
            },
          },
        },
      ],
    });

    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
        "Content-Type": "application/json",
      },
    };

    return { raw, config };
  };

  const showItems = async () => {
    redirectToInventory();
  };

  const uploadImage = async () => {
    if (!imageSrc) {
      alert("Please capture an image first.");
      return;
    }

    const { raw, config } = await uploadMiddleware(
      await uploadImageToTempStorage(img64)
    );
    try {
      const response = await axios.post(
        `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
        raw,
        config
      );

      const row = response.data;
      const itemsRaw = row.outputs[0].data.concepts; // it is a list
      const items = itemsRaw.filter((truc) => {
        if (truc.value >= 0.75) {
          return truc;
        }
      });

      const names = items.map((baba) => {
        return baba.name;
      });

      showStuff(items);
      console.log(img64);
      saveToDatabase(names, img64);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const showStuff = (stuff) => {
    let result = "";
    for (let i = 0; i < stuff.length; i++) {
      result += stuff[i].name + " ";
    }
    alert(result);
  };

  return (
    <div className="Detection">
      <h1>Virtuaal Closet</h1>
      <div className="Camera">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="buttons">
        <Button
          variant="contained"
          style={{ backgroundColor: "blue" }}
          onClick={capture}
        >
          {" "}
          Capture Image{" "}
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "blue" }}
          onClick={uploadImage}
        >
          Upload Image
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "blue" }}
          onClick={showItems}
        >
          Show Items
        </Button>
      </div>
      {imageSrc && (
        <div>
          <h2>Preview</h2>
          <img
            src={imageSrc}
            alt="Captured"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default Detection;
