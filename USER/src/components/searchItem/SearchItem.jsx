import "./searchItem.css";
import { useNavigate } from "react-router-dom";

const SearchItem = ({ item, dates, options }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/hotels/${item._id}`, { state: { dates, options } });
  };
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siFeatures">{item.desc}</span>
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <button className="siCheckButton" onClick={handleClick}>
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
