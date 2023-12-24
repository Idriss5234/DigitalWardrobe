import React, { useEffect, useState } from "react";
import Tab from "./Tab";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InventoryPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const redirectToDetection = () => {
    navigate("/detection");
  };

  const fetchItems = async () => {
    try {
      const result = await axios.get(
        "https://digitward.onrender.com/items/fetch"
      );
      return result.data;
    } catch (error) {
      console.error("Error fetching items:", error);
      return [];
    }
  };

  const elementedItems = async () => {
    const itemsData = await fetchItems();
    return itemsData.map((item, index) => (
      <div key={item.id}>
        <Tab number={index + 1} name={item.name} imageSrc={item.ImageSource} />
      </div>
    ));
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await elementedItems();
      setItems(result);
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        marginTop: "10px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px", color: "gray" }}>
        Inventory Page
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/*  <Button
          variant="contained"
          color="primary"
          onClick={redirectToDetection}
          style={{ width: "100%", marginBottom: "20px" }}
        >
          Get Recommendations
    </Button> */}
        <Button
          variant="contained"
          color="secondary"
          onClick={redirectToDetection}
          style={{
            width: "100%",
            marginBottom: "20px",
            width: "20%",
            background: "skyblue",
          }}
        >
          Add Item
        </Button>
        {items.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "16px",
              color: "black",
            }}
          >
            {items}
          </div>
        ) : (
          <p>No items available</p>
        )}
      </div>
    </div>
  );
};

export default InventoryPage;
