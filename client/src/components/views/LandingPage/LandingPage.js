import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row } from "antd";

const { Meta } = Card;

function LandingPage() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    axios.post("/api/product/products").then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setProducts(response.data.productInfo);
      } else {
        alert("상품조회에 실패했습니다.");
      }
    });
  }, []);

  const renderCards = Products.map((product, index) => {
    return (
      //   <Col lg={6} md={8} xs={24}>
      <Card
        key={index}
        hoverable={true}
        cover={<img src={`http://localhost:5000/${product.images[0]}`} />}
      >
        <Meta title={product.title} description={`$${product.price}`} />
      </Card>
      //   </Col>
    );
  });
  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Let's Travel Anywhere <Icon type="rocket" />
        </h2>
      </div>

      {renderCards}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <button>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
