import React from "react";

const Tab = ({ number, name, imageSrc }) => {
  return (
    <div
      style={{
        background: "",
        width: "100%",
        height: "15vh",
        display: "flex",
        gap: "20px",
        justifyContent: "flex-start",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: "20px",
        border: "1px solid black",
        padding: "10px",
      }}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          background: "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "14px",
        }}
      >
        {number}
      </div>
      <img
        src={imageSrc}
        style={{
          width: "50px",
          height: "50px",
          margin: "15px",
        }}
        alt={name}
      />
      <h3>{name}</h3>
    </div>
  );
};

export default Tab;
