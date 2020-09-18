import React from "react";
import { Carousel } from "antd";

const contentStyle = {
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const ImageSlide = (props) => {
  const { images } = props;
  console.log(images);
  return (
    <div>
      {images.map((image, index) => (
        <img src={`http://localhost:5000/${image}`} />
      ))}
    </div>
  );
};

export default ImageSlide;
