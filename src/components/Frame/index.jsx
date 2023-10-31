import "./frame.css";
import NavBar from "../NavBar";
import SideBar from "../SideBar";

const Frame = (props) => {
  return (
    <div className="frame">
      <SideBar />
      <div className="right-frame">
        <NavBar />
        <div className="content">
          <h1 className="header">{props.heading}</h1>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Frame;
