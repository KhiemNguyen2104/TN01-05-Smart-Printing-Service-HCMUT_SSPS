import React from "react";
import CustomSlider from "../components/Slider";
import HeaderMenu from "../components/HeaderMenu";
import images from "../data/images";

const Home = () => {
  localStorage.setItem('isPrinting', "false");

  return (
    <div className="flex flex-col h-screen pb-12 bg-white overflow-hidden">
        <HeaderMenu />
        <div>
        {/* Phần hiển thị ảnh */}
        <CustomSlider className="flex-grow">
            {images.map((image, index) => {
            return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
            })}
        </CustomSlider>
        </div>
    </div>
  );
};

export default Home;