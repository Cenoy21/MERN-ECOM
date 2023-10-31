import "./addsubcategory.css";
import { Input, Button, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddSubCategory = () => {
  const [data, setData] = useState({ name: "", image: "", categoryID: "" });
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const getSubCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/subcategory/${id}`
      );
      setData({
        ...data,
        image: response.data.image,
        name: response.data.name,
        categoryID: response.data.categoryID,
      });
    } catch (e) {
      console.log(e);
    }
  };
  console.log(data);

  const fetchCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8000/category");
      console.log(response.data);

      const actualData = response.data.map((item) => {
        return { label: item.name, value: item._id };
      });

      setCategory(actualData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCategory();
    if (id) {
      getSubCategory();
    }
  }, []);

  const navigate = useNavigate();

  const onChange = (e, key) => {
    if (key == "category") {
      setData({ ...data, categoryID: e });
    } else {
      setData({ ...data, [key]: e.target.value });
    }
  };

  const addSubCategory = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8000/subcategory", data);
      setLoading(false);
      navigate("/seller/subcategory");
    } catch (e) {
      console.log(e);
    }
  };

  const editSubCategory = async () => {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:8000/subcategory/${id}`, data);
      setLoading(false);
      navigate("/seller/subcategory");
    } catch (e) {
      console.log(e);
    }
  };

  const onClick = () => {
    if (id) {
      editSubCategory();
    } else {
      addSubCategory();
    }
  };

  const onUploadChange = (info) => {
    if (info.file.status === "done") {
      setData({ ...data, image: info.file.response.imageURL });
    }
  };

  return (
    <div className="add-category">
      <h1>{id ? "Edit Sub Category" : "Add Sub Category"}</h1>
      <div className="form">
        <label>Name</label>
        <Input
          placeholder="Name"
          size="large"
          onChange={(e) => onChange(e, "name")}
          value={data.name}
        />
        <label>Category</label>

        <Select
          defaultValue="category"
          className="category-select"
          value={data.categoryID}
          onChange={(e) => onChange(e, "category")}
          options={category}
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
          {id ? "Edit Sub Category" : "Add Sub Category"}
        </Button>
      </div>
    </div>
  );
};

export default AddSubCategory;
