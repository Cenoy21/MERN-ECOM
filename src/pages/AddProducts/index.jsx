import "./addproducts.css";
import { Input, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddProducts = () => {
  const [data, setData] = useState({ name: "", image: "" });
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const getCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/category/${id}`);
      setData({
        ...data,
        image: response.data.image,
        name: response.data.name,
      });
    } catch (e) {
      console.log(e);
    }
  };
  console.log(data);

  useEffect(() => {
    if (id) {
      getCategory();
    }
  }, []);

  const navigate = useNavigate();

  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };

  const addCategory = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/category", data);
      setLoading(false);
      navigate("/seller/category");
    } catch (e) {
      console.log(e);
    }
  };

  const editCategory = async () => {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:8000/category/${id}`, data);
      setLoading(false);
      navigate("/seller/category");
    } catch (e) {
      console.log(e);
    }
  };

  const onClick = () => {
    if (id) {
      editCategory();
    } else {
      addCategory();
    }
  };

  const onUploadChange = (info) => {
    if (info.file.status === "done") {
      setData({ ...data, image: info.file.response.imageURL });
    }
  };

  return (
    <div className="add-category">
      <h1>{id ? "Edit Category" : "Add Category"}</h1>
      <div className="form">
        <label>Name</label>
        <Input
          placeholder="Name"
          size="large"
          onChange={(e) => onChange(e, "name")}
          value={data.name}
        />
        <div className="upload-div">
          <label>Image</label>
          <Upload
            name="file"
            action="http://localhost:8000/upload"
            onChange={onUploadChange}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </div>
        <Button
          className="add-category-button"
          type="primary"
          size="large"
          onClick={onClick}
          loading={loading}
        >
          {id ? "Edit Category" : "Add Category"}
        </Button>
      </div>
    </div>
  );
};

export default AddProducts;
