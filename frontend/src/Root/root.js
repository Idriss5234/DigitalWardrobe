import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./root.css";

const Root = () => {
  const navigate = useNavigate();

  const redirectToAuth = () => {
    navigate("/auth");
  };

  return (
    <div className="page">
      <link
        href="https://fonts.googleapis.com/css2?family=Dosis&family=Fuggles&family=Mooli&family=Pacifico&family=Poppins&display=swap"
        rel="stylesheet"
      />
      <h1 style={{ color: "black" }}>Welcome to our app</h1>
      <p>
        The Digital Wardrobe project streamlines daily outfit decisions by
        categorizing users' clothing items through image recognition. It
        suggests personalized outfits, considering individual style preferences
        and real-time weather conditions for a seamless wardrobe management
        experience.
      </p>

      <Button variant="contained" onClick={redirectToAuth}>
        Get started
      </Button>
    </div>
  );
};

export default Root;
