import "./subcategory.css";
import SideBar from "../../components/SideBar";
import { Button, Table } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const SubCategory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const subcategoryColumn = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (id) => {
        return <Link to={`/seller/add-subcategory/${id}`}>{id}</Link>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (text) => {
        return (
          <img src={text} crossOrigin="anonymous" className="category-img" />
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "_id",
      render: (id) => {
        return (
          <i
            onClick={() => {
              onDelete(id);
            }}
            class="fa-solid fa-trash delete"
          ></i>
        );
      },
    },
  ];

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/subcategory/${id}`);
      fetchSubCategory();
    } catch (e) {
      console.log(e);
    }
  };

  const fetchSubCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/subcategory");
      setLoading(false);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchSubCategory();
  }, []);

  const navigate = useNavigate();

  const onClick = () => {
    navigate("/seller/add-subcategory");
  };

  return (
    <div className="category">
      <SideBar />
      <div className="category-container">
        <h1>Sub Category</h1>
        <div className="category-btns">
          <Button type="primary" onClick={onClick}>
            Add Sub Category
          </Button>
        </div>
        <Table
          className="category-table"
          columns={subcategoryColumn}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default SubCategory;
