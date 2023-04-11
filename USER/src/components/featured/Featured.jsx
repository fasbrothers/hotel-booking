import { useContext, useState } from "react";
import "./featured.css";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Featured = () => {
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    child: 0,
    adult: 1,
    room: 1,
  });
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const destination = e.target.id;

    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };
  return (
    <div className="featured">
      <div className="featuredItem" id="TASHKENT" onClick={handleSearch}>
        <img src="tashkent.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <p>Tashkent</p>
        </div>
      </div>

      <div className="featuredItem" id="SAMARKAND" onClick={handleSearch}>
        <img src="samarkand.jpeg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <p>Samarkand</p>
        </div>
      </div>
      <div className="featuredItem" id="BUKHARA" onClick={handleSearch}>
        <img src="bukhara.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <p>Bukhara</p>
        </div>
      </div>
      <div className="featuredItem" id="KHIVA" onClick={handleSearch}>
        <img src="khiva.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <p>Khiva</p>
        </div>
      </div>
    </div>
  );
};

export default Featured;
