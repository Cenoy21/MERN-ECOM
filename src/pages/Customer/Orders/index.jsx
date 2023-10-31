import "./orders.css";
import SideBar from "../../../components/SideBar";
import { Button, Table } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Orders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const orderColumn = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (id) => {
        return <Link to={`/seller/add-order/${id}`}>{id}</Link>;
      },
    },
    {
      title: "Customer",
      dataIndex: "customer",
      render: (customer) => <p>{customer.name}</p>,
    },
    {
      title: "Products",
      dataIndex: "products",
      render: (product) => <p>{product[0]._id}</p>,
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
      await axios.delete(`http://localhost:8000/order/${id}`);
      fetchorder();
    } catch (e) {
      console.log(e);
    }
  };

  const fetchorder = async () => {
    setLoading(true);
    try {
      const sellerId = localStorage.getItem("sellerId");
      const response = await axios.get(
        `http://localhost:8000/order?sellerId=${sellerId}`
      );
      setLoading(false);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchorder();
  }, []);

  const navigate = useNavigate();

  const onClick = () => {
    navigate("/seller/add-order");
  };

  return (
    <div className="order">
      <SideBar />
      <div className="order-container">
        <h1>order</h1>
        <div className="order-btns">
          <Button type="primary" onClick={onClick}>
            Add order
          </Button>
        </div>
        <Table
          className="order-table"
          columns={orderColumn}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default Orders;
