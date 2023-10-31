import axios from "axios";
import "./product.css";
import { Button, Card } from "antd";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Product = (props) => {
  const [customer, setCustomer] = useState({});
  const getCustomerById = async () => {
    const customerId = localStorage.getItem("customerId");
    console.log(customerId);
    const response = await axios.get(
      `http://localhost:8000/customer/${customerId}`
    );
    setCustomer(response.data);
  };

  const onBuy = async () => {
    const customerId = localStorage.getItem("customerId");
    const sellerId = props.sellerId;
    const products = [
      {
        products: props.id,
        quantity: 1,
      },
    ];
    await getCustomerById();
    const address = customer.address;

    await axios.post(`http://localhost:8000/order`, {
      customer: customerId,
      seller: sellerId,
      products: products,
      shippingAddress: address,
    });
    toast("Order Placed");
  };

  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      cover={
        <img alt="example" src={props.thumbnailImg} crossOrigin="anonymous" />
      }
    >
      <div className="content">
        <div className="price">
          <h3>{props.price}</h3>
          <h3>{props.discount}</h3>
        </div>

        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <div className="btn">
          <Button onClick={onBuy}>Buy</Button>
          <Button>Add To Cart</Button>
        </div>
      </div>
    </Card>
  );
};

export default Product;
