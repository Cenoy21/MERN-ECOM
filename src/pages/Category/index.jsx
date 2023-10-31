import "./category.css";
import SideBar from "../../components/SideBar";
import { Button, Table } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Category = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryColumn = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (id) => {
        return <Link to={`/seller/add-category/${id}`}>{id}</Link>;
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
      await axios.delete(`http://localhost:8000/category/${id}`);
      fetchCategory();
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/category");
      setLoading(false);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const navigate = useNavigate();

  const onClick = () => {
    navigate("/seller/add-category");
  };

  return (
    <div className="category">
      <SideBar />
      <div className="category-container">
        <h1>Category</h1>
        <div className="category-btns">
          <Button type="primary" onClick={onClick}>
            Add Category
          </Button>
        </div>
        <Table
          className="category-table"
          columns={categoryColumn}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default Category;
