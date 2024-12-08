// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import CustomSlider from "../components/Slider";
import images from "../data/images";

const HomeAdmin = () => {
  return (
    <div>
      {/* Phần hiển thị ảnh */}
      <CustomSlider>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
        })}
      </CustomSlider>

    </div>
  );
};

export default HomeAdmin;
