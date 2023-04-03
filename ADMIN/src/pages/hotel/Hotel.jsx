import "../user/user.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Hotel = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { data, loading, error } = useFetch(`/${path}`);

  // find the info with the id
  const pathId = location.pathname.split("/")[2];

  const [list, setList] = useState(data);
  const [info, setInfo] = useState([]);

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
              <h1 className="title">Hotel information</h1>
              <div className="item">
                <div className="details">
                  <p>{info.name}</p>
                  <h1 className="itemTitle">{info.title}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Price:</span>
                    <span className="itemValue">${info.cheapestPrice}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Description:</span>
                    <span className="itemValue">{info.desc}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">
                      {info.city}, {info.address}
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

export default Hotel;
