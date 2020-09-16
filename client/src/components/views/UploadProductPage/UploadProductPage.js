import React, { useState } from "react";
import { Button, Form, Input } from "antd";

//Import-Component
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";

// 구조 분해 할당
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
];

const UploadProductPage = (props) => {
  console.log(props);
  // State-Hook
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  // Handler-function
  const titleChangeHandler = (event) => {
    setTitle(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };
  const continentsChangeHandler = (event) => {
    setContinent(event.target.value);
  };
  // child-component-props-function
  const updataImages = (newImages) => {
    console.log(newImages);
    setImages(newImages);
    console.log(Images);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    if (!Title || !Description || !Price || !Continent || !Images) {
      return alert("모든 값을 넣어주세요.");
    }
    const body = {
      // 로그인된 사람의 id
      writer: props.user.userData._id,
      title: Title,
      description: Description,
      price: Price,
      images: Images,
      continent: Continent,
    };
    Axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("상품업로드 성공");
        props.history.push("/");
      } else {
        alert("업로드 실패");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 lever={2}>여행 상품 업로드</h2>
      </div>
      <Form onSubmit={submitHandler}>
        <FileUpload refreshFunction={updataImages} />
        <br />
        <br />
        <label>이름</label>
        <Input onChange={titleChangeHandler} value={Title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={Description} />
        <br />
        <br />
        <label>가격($)</label>
        <Input onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <select onChange={continentsChangeHandler} value={Continent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={submitHandler}>확인</Button>
      </Form>
    </div>
  );
};

export default UploadProductPage;
