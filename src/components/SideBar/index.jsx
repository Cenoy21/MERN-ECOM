import "./sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const onClick = () => {
    localStorage.removeItem("sellerId");
    localStorage.removeItem("token");
    navigate("/seller/login");
  };
  return (
    <div className="sidebar">
      <div className="logo-section">
        <i className="fa-solid fa-cart-shopping fa-beat-fade"></i>
        <h1>Ecom App</h1>
      </div>
      <h2 className="section-heading">Dashboard</h2>
      <div className="dashboard-section">
        <NavLink className="sidebar-link" to="/seller/dashboard">
          <i className="fa-solid fa-gauge-simple-high"></i>
          Dashboard
        </NavLink>

        <NavLink className="sidebar-link" to="/seller/products">
          <i className="fa-solid fa-warehouse"></i>
          Inventory
        </NavLink>

        <NavLink className="sidebar-link" to="/seller/category">
          <i className="fa-brands fa-product-hunt"></i>
          Category
        </NavLink>

        <NavLink className="sidebar-link" to="/seller/subcategory">
          <i className="fa-solid fa-magnifying-glass"></i>
          Sub Category
        </NavLink>

        <NavLink className="sidebar-link" to="/seller/orders">
          <i className="fa-brands fa-jedi-order"></i>
          Order
        </NavLink>
      </div>
      <h2 className="section-heading">Settings</h2>
      <div className="settings-section">
        <NavLink className="sidebar-link" to="/seller/dashboard">
          <i className="fa-solid fa-file-invoice"></i>
          Account
        </NavLink>

        <p className="sidebar-link" onClick={onClick}>
          <i className="fa-solid fa-file-invoice"></i>
          Sign Out
        </p>
      </div>
    </div>
  );
};

export default SideBar;
