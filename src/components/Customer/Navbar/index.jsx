import "./navbar.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const onLogOut = () => {
    localStorage.removeItem("customerId");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="customer-navbar">
      <div className="left">
        <h1>Ecom</h1>
      </div>
      <div className="right">
        <p>Home</p>
        <p>Category</p>
        <p>Cart</p>
        <p>Orders</p>
        {localStorage.getItem("customerId") ? (
          <Button onClick={onLogOut}>Log Out</Button>
        ) : (
          <Button>Log In</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
