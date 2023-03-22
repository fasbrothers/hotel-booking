import "./widget.scss";

const Widget = ({ type }) => {
  let data;

  switch (type) {
    case "user":
      data = {
        title: "Users",
        link: "View all users",
      };
      break;
    case "hotel":
      data = {
        title: "Hotels",
        link: "View all hotels",
      };
      break;
    case "room":
      data = {
        title: "Rooms",
        link: "View all rooms",
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">20</span>
        <span className="link">{data.link}</span>
      </div>
    </div>
  );
};

export default Widget;
