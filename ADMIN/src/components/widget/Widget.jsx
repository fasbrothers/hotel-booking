import { Link } from "react-router-dom";
import "./widget.scss";

const Widget = ({ type}) => {
  let data;
  switch (type) {
    case "user":
      data = {
        title: "Users",
        name: "View all users",
        link:"/users"
      };
      break;
    case "hotel":
      data = {
        title: "Hotels",
        name: "View all hotels",
        link:"/hotels"
      };
      break;
    case "room":
      data = {
        title: "Rooms",
        name: "View all rooms",
        link:"/rooms"
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <Link to={data.link}>
        <span className="link">{data.name}</span>
        </Link>
      </div>
    </div>
  );
};

export default Widget;
