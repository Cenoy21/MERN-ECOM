import "./App.css";
import { Routes, Route } from "react-router-dom";
import SellerLogin from "./pages/SellerLogin";
import SellerDashboard from "./pages/SellerDashboard";
import Category from "./pages/Category";
import AddCategory from "./pages/AddCategory";
import SubCategory from "./pages/SubCategory";
import AddSubCategory from "./pages/AddSubCategory";
import { Navigate } from "react-router-dom";
import Home from "./pages/Customer/Home";
import Products from "./pages/Products";
import AddProducts from "./pages/AddProducts";
import Login from "./pages/Customer/Login";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./pages/Customer/Orders";

function App() {
  const Token = ({ children }) => {
    const token = localStorage.getItem("token");
    if (token) {
      return <>{children}</>;
    } else {
      return <Navigate to="/seller/login" />;
    }
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/customer/login" element={<Login />} />
        <Route
          path="/seller/dashboard"
          element={
            <Token>
              <SellerDashboard />
            </Token>
          }
        />
        <Route
          path="/seller/category"
          element={
            <Token>
              <Category />
            </Token>
          }
        />
        <Route
          path="/seller/add-category"
          element={
            <Token>
              <AddCategory />
            </Token>
          }
        />
        <Route
          path="/seller/add-category/:id"
          element={
            <Token>
              <AddCategory />
            </Token>
          }
        />
        <Route
          path="/seller/subcategory"
          element={
            <Token>
              <SubCategory />
            </Token>
          }
        />
        <Route
          path="/seller/add-subcategory"
          element={
            <Token>
              <AddSubCategory />
            </Token>
          }
        />
        <Route
          path="/seller/add-subcategory/:id"
          element={<AddSubCategory />}
        />
        <Route
          path="/seller/orders"
          element={
            <Token>
              <Orders />
            </Token>
          }
        />

        <Route path="/seller/products" element={<Products />} />
        <Route path="/seller/add-products" element={<AddProducts />} />
      </Routes>
    </>
  );
}

export default App;
