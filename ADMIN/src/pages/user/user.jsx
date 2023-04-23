import "./user.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const User = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { data, loading, error } = useFetch(`/${path}`);
  const [list, setList] = useState(data);
  const [info, setInfo] = useState([]);

  // find the info with the id
  const pathId = location.pathname.split("/")[2];

  useEffect(() => {
    setList(data);
    const info = data.find((info) => info._id === pathId);
    setInfo(info);
    // clean up
    return () => {
      setInfo([]);
    };
  }, [data]);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        {info && (
          <div className="top">
            <div className="left">
              <Link to={`/${path}/edit/${pathId}`} className="editButton">
                Edit
              </Link>
              <h1 className="title">User information</h1>
              <div className="item">
                <div className="details">
                  <h1 className="itemTitle">{info.username}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{info.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{info.phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">
                      {info.country}, {info.city}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="right"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
