import "./login.css";
import { Input, Button } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };

  const loginCustomer = async () => {
    setLoading(true);
    try {
      const user = await axios.post(
        "http://localhost:8000/customer/login",
        data
      );
      const customerId = user.data.customerId;
      const token = user.data.token;
      localStorage.setItem("customerId", customerId);
      localStorage.setItem("token", token);
      setLoading(false);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const onClick = () => {
    loginCustomer();
  };

  console.log(data);

  return (
    <div className="seller-login">
      <h1>Ecom App</h1>
      <div className="form">
        <label>Email:</label>
        <Input
          placeholder="Email"
          size="large"
          onChange={(e) => onChange(e, "email")}
        />
        <label>Password:</label>
        <Input.Password
          placeholder="Password"
          size="large"
          onChange={(e) => onChange(e, "password")}
        />
        <Button
          className="login-button"
          type="primary"
          size="large"
          onClick={onClick}
          block
        >
          Log In
        </Button>

        <p>Not a member? Sign Up</p>
      </div>
    </div>
  );
};

export default Login;
