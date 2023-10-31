import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Table } from "antd";
import Frame from "../../components/Frame";
import "./products.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("working", item);
  const navigate = useNavigate();

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/product/${id}`);
      fetchProducts();
    } catch (e) {
      console.log(e);
    }
  };

  const productsColumn = [
    {
      title: "ID",
      dataIndex: "_id",
      // render: (id) => <Link to={`/seller/add-Products/${id}`}>{id}</Link>,
    },
    { title: "Name", dataIndex: "name" },
    { title: "Description", dataIndex: "description" },
    { title: "Price", dataIndex: "price" },
    { title: "Discount", dataIndex: "discount" },
    { title: "Thumbnail Image", dataIndex: "thumbnailImage" },
    {
      title: "Images",
      dataIndex: "images",
      // render: (images) => (
      //   <div>
      //     {images.map((image, index) => (
      //       <img
      //         key={index}
      //         src={image}
      //         alt={`Image ${index}`}
      //         crossOrigin="anonymous"
      //         className="item-img"
      //       />
      //     ))}
      //   </div>
      // ),
    },
    { title: "Category ID", dataIndex: "category" },
    { title: "Subcategory ID", dataIndex: "subcategory" },
    { title: "Variants", dataIndex: "variants" },
    { title: "Is Available", dataIndex: "is_available" },
    { title: "Quantity", dataIndex: "quantity" },
    { title: "Brand", dataIndex: "brand" },
    {
      title: "Tags",
      dataIndex: "tags",
      // render: (tags) => tags.join(", "),
    },
    { title: "Seller ID", dataIndex: "seller" },
    {
      title: "Ratings",
      dataIndex: "ratings",
      // render: (ratings) => (
      //   <ul>
      //     {ratings.map((rating, index) => (
      //       <li key={index}>
      //         Customer ID: {rating.customerid}, Rating: {rating.rating}, Review:{" "}
      //         {rating.review}
      //       </li>
      //     ))}
      //   </ul>
      // ),
    },
    {
      title: "Delete",
      dataIndex: "_id",
      // render: (id) => (
      //   <i
      //     className="fa-solid fa-trash delete-icon"
      //     onClick={() => onDelete(id)}
      //   ></i>
      // ),
    },
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/product");
      setItem(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onClick = () => {
    navigate("/seller/add-products");
  };

  return (
    <Frame heading="PRODUCT">
      <div className="Products-btns">
        <Button onClick={onClick} type="primary" className="products-btn">
          ADD PRODUCT
        </Button>
      </div>
      <div className="table-div">
        <Table
          className="Products-table"
          columns={productsColumn}
          dataSource={[]}
        />
      </div>
    </Frame>
  );
};

export default Products;
